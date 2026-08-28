import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("APP_ORIGIN") || "http://localhost:8444",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: corsHeaders });

async function getAccessToken(clientId: string, clientSecret: string) {
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { Authorization: `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
    signal: controller.signal,
  });
  clearTimeout(timeout);
  if (!response.ok) throw new Error("Spotify authentication failed.");
  const data = await response.json() as { access_token?: string };
  if (!data.access_token) throw new Error("Spotify did not return an access token.");
  return data.access_token;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Use POST." }, 405);

  const authorization = request.headers.get("Authorization");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!authorization || !supabaseUrl || !supabaseAnonKey) return json({ error: "Authentication is required." }, 401);
  const client = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authorization } } });
  const { data: { user } } = await client.auth.getUser();
  if (!user) return json({ error: "Authentication is required." }, 401);

  const clientId = Deno.env.get("SPOTIFY_CLIENT_ID");
  const clientSecret = Deno.env.get("SPOTIFY_CLIENT_SECRET");
  if (!clientId || !clientSecret) return json({ error: "Spotify search is not configured on the server." }, 503);

  try {
    const body = await request.json() as { query?: unknown; type?: unknown };
    const query = typeof body.query === "string" ? body.query.trim() : "";
    if (query.length < 2 || query.length > 100) return json({ error: "Search must be between 2 and 100 characters." }, 400);
    const type = body.type === "playlist" ? "playlist" : "track,playlist";
    const token = await getAccessToken(clientId, clientSecret);
    const url = new URL("https://api.spotify.com/v1/search");
    url.searchParams.set("q", query);
    url.searchParams.set("type", type);
    url.searchParams.set("limit", "10");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) return json({ error: `Spotify returned ${response.status}.` }, 502);
    const payload = await response.json() as { tracks?: { items?: Array<Record<string, unknown>> }; playlists?: { items?: Array<Record<string, unknown>> } };
    const tracks = (payload.tracks?.items || []).map(track => {
      const artists = Array.isArray(track.artists) ? track.artists as Array<Record<string, unknown>> : [];
      return { kind: "track", id: String(track.id || ""), title: String(track.name || ""), detail: artists.map(artist => String(artist.name || "")).join(", "), spotify_url: String((track.external_urls as Record<string, unknown> | undefined)?.spotify || ""), cover_url: String((Array.isArray(track.album && (track.album as Record<string, unknown>).images) ? ((track.album as Record<string, unknown>).images as Array<Record<string, unknown>>)[0]?.url : "") || "") || null };
    });
    const playlists = (payload.playlists?.items || []).filter(item => item && item.id).map(playlist => ({ kind: "playlist", id: String(playlist.id), title: String(playlist.name || ""), detail: String((playlist.owner as Record<string, unknown> | undefined)?.display_name || "Spotify playlist"), spotify_url: String((playlist.external_urls as Record<string, unknown> | undefined)?.spotify || ""), cover_url: String((Array.isArray(playlist.images) ? (playlist.images as Array<Record<string, unknown>>)[0]?.url : "") || "") || null }));
    return json({ query, results: [...tracks, ...playlists].filter(item => item.title && item.spotify_url).slice(0, 10) });
  } catch (error) {
    console.error("Spotify search failed", error);
    return json({ error: "Spotify search failed." }, 502);
  }
});
