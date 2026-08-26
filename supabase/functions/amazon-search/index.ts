import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

type AmazonProduct = {
  asin: string;
  title: string;
  price: string;
  description: string;
  rating: string;
  review_count: string;
  availability: string;
  image_url: string | null;
  product_url: string;
  source: "amazon";
};

function firstString(...values: unknown[]) {
  return values.find((value): value is string => typeof value === "string" && value.trim().length > 0)?.trim() || "";
}

function normalizeProduct(raw: Record<string, unknown>): AmazonProduct | null {
  const asin = firstString(raw.asin, raw.ASIN, raw.product_id, raw.id);
  const title = firstString(raw.product_title, raw.title, raw.name);
  const productUrl = firstString(raw.product_url, raw.url, raw.link);
  if (!asin || !title || !productUrl) return null;

  const price = firstString(raw.product_price, raw.price, raw.current_price, raw.buybox_price, raw.price_string, raw.deal_price) || "Price unavailable";
  const description = firstString(raw.product_description, raw.description, raw.about_this_item, raw.feature_bullets) || "No description available.";
  const rating = firstString(raw.product_star_rating, raw.rating, raw.stars) || "Not rated";
  const reviewCount = firstString(raw.product_num_ratings, raw.review_count, raw.reviews_count, raw.total_reviews) || "No reviews yet";
  const availability = firstString(raw.product_availability, raw.availability, raw.stock) || "Check availability on Amazon";
  const imageUrl = firstString(raw.product_photo, raw.image, raw.image_url, raw.thumbnail) || null;
  return { asin, title, price, description, rating, review_count: reviewCount, availability, image_url: imageUrl, product_url: productUrl, source: "amazon" };
}

function extractProducts(payload: unknown): Record<string, unknown>[] {
  if (!payload || typeof payload !== "object") return [];
  const body = payload as Record<string, unknown>;
  const candidates = [body.data, body.products, body.results, body.items];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"));
    if (candidate && typeof candidate === "object") {
      const nested = candidate as Record<string, unknown>;
      for (const value of [nested.products, nested.results, nested.items]) {
        if (Array.isArray(value)) return value.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"));
      }
    }
  }
  return [];
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Use POST." }, 405);

  const rapidApiKey = Deno.env.get("RAPIDAPI_KEY");
  const rapidApiHost = Deno.env.get("RAPIDAPI_AMAZON_HOST");
  const rapidApiUrl = Deno.env.get("RAPIDAPI_AMAZON_SEARCH_URL") || "https://real-time-amazon-data.p.rapidapi.com/search";
  if (!rapidApiKey || !rapidApiHost) return json({ error: "Amazon search is not configured on the server." }, 503);

  let query = "";
  try {
    const body = await request.json() as { query?: unknown; country?: unknown; page?: unknown };
    query = typeof body.query === "string" ? body.query.trim() : "";
    if (query.length < 2 || query.length > 100) return json({ error: "Search must be between 2 and 100 characters." }, 400);

    const url = new URL(rapidApiUrl);
    url.searchParams.set("query", query);
    url.searchParams.set("country", typeof body.country === "string" ? body.country : "US");
    url.searchParams.set("page", typeof body.page === "number" ? String(body.page) : "1");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    let response: Response;
    try {
      response = await fetch(url, { signal: controller.signal, headers: { "x-rapidapi-key": rapidApiKey, "x-rapidapi-host": rapidApiHost } });
    } finally {
      clearTimeout(timeout);
    }
    if (!response.ok) return json({ error: `Amazon provider returned ${response.status}.` }, 502);

    const payload = await response.json();
    const products = extractProducts(payload).map(normalizeProduct).filter((item): item is AmazonProduct => item !== null).slice(0, 20);
    return json({ query, products });
  } catch (error) {
    const message = error instanceof DOMException && error.name === "AbortError" ? "Amazon search timed out." : "Amazon search failed.";
    console.error(message, error);
    return json({ error: message }, 502);
  }
});
