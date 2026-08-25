import { useEffect, useState } from "react";
import heroBg from "@/imports/ChatGPT_Image_Aug_25__2026__02_29_21_PM.png";
import howCreate from "@/imports/how-create.jpg";
import howShare from "@/imports/how-share.jpg";
import howGift from "@/imports/how-gift-transparent.png";
import { hasSupabaseConfig, supabase } from "@/lib/supabase";

const GIFTS = [
  { id:1, name:"Sony WH-1000XM5",       brand:"Sony",        price:"$349", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&auto=format" },
  { id:2, name:"Fujifilm Instax Mini 12", brand:"Fujifilm",    price:"$79",  img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=200&fit=crop&auto=format" },
  { id:3, name:"Logitech MX Keys Mini",  brand:"Logitech",    price:"$99",  img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop&auto=format" },
  { id:4, name:"Blue Yeti Nano",         brand:"Blue",        price:"$99",  img:"https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&h=200&fit=crop&auto=format" },
  { id:5, name:"Coquette Tote Bag",      brand:"Accessories", price:"$35",  img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=200&fit=crop&auto=format" },
];

const BADGES = [
  { icon:"crown", name:"First Boost",      desc:"Send your first gift",       unlocked:true  },
  { icon:"star", name:"Wish Creator",     desc:"Complete a wish",             unlocked:true  },
  { icon:"heart", name:"Super Supporter",  desc:"Supported 10+ creators",     unlocked:true  },
  { icon:"angel", name:"Early Angel",      desc:"Joined during early access",  unlocked:true  },
  { icon:"trophy", name:"Top Gifter",       desc:"Ranked in top gifter list",   unlocked:false },
  { icon:"lock", name:"Secret Admirer",   desc:"Sent 5 anonymous gifts",      unlocked:false },
];

const WHY = [
  { icon:"gift", title:"Thoughtful surprises", desc:"Fans send what you love — curated from your wishlist, sent with love." },
  { icon:"shield", title:"Safe & secure",        desc:"Your address stays private. We handle shipping and security." },
  { icon:"heart", title:"Stronger connections", desc:"Build a deeper bond with the people who support your content." },
  { icon:"phone", title:"Focus on creating",    desc:"Keep creating while your community shows up for you." },
];

/* ── colour palette ── */
const C = {
  bg:       "#fff5f8",
  bgLight:  "#fff0f5",
  bgMid:    "#ffe8f3",
  pink:     "#FF4D8D",
  pinkMid:  "#ff79a8",
  pinkDark: "#c2195b",
  text:     "#3d0a1e",
  textMid:  "#a0456a",
  textSoft: "#d47fa0",
  border:   "#ffd6e8",
};

type IconName = "bow" | "search" | "bag" | "mask" | "gift" | "lock" | "shield" | "heart" | "phone" | "crown" | "star" | "angel" | "trophy" | "mail" | "check" | "social" | "google" | "apple";

function SvgIcon({ name, size = 24, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  const common = { fill: filled ? "currentColor" : "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconName, React.ReactNode> = {
    bow: <><path {...common} d="M12 11.5 5.5 6.8a2.8 2.8 0 0 0-3.2 4.6L9 15l3-3.5 3 3.5 6.7-3.6a2.8 2.8 0 0 0-3.2-4.6L12 11.5Z"/><path {...common} d="M12 11.5v8M9.5 19.5h5"/></>,
    search: <><circle {...common} cx="10.5" cy="10.5" r="5.7"/><path {...common} d="m15 15 4.5 4.5"/></>,
    bag: <><path {...common} d="M5 8.5h14l-1 11H6l-1-11Z"/><path {...common} d="M8.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5"/></>,
    mask: <><path {...common} d="M3 8.5c2-2 5.2-2 9 0 3.8-2 7-2 9 0v4.2c-1.2 3-3.4 4.5-6.3 4.5-1.2 0-2.1-.8-2.7-2.2-.6 1.4-1.5 2.2-2.7 2.2C6.4 17.2 4.2 15.7 3 12.7V8.5Z"/><circle {...common} cx="7.5" cy="11" r="1"/><circle {...common} cx="16.5" cy="11" r="1"/></>,
    gift: <><path {...common} d="M3 10h18v10H3zM2 7h20v3H2zM12 7v13M12 7H8.5a2.5 2.5 0 1 1 2.2-3.7L12 7ZM12 7h3.5a2.5 2.5 0 1 0-2.2-3.7L12 7Z"/></>,
    lock: <><rect {...common} x="5" y="10" width="14" height="10" rx="2"/><path {...common} d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2"/></>,
    shield: <><path {...common} d="M12 3 20 6v5c0 5-3.3 8.2-8 10-4.7-1.8-8-5-8-10V6l8-3Z"/><path {...common} d="m8.5 12 2.2 2.2 4.8-5"/></>,
    heart: <path {...common} d="M12 20.2S4 15.7 4 9.4A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 8 2.4c0 6.3-8 10.8-8 10.8Z"/>,
    phone: <><rect {...common} x="7" y="3" width="10" height="18" rx="2"/><path {...common} d="M10 6h4M11 18h2"/></>,
    crown: <path {...common} d="m3 7 4.5 4L12 5l4.5 6L21 7l-2 11H5L3 7ZM5 21h14"/>,
    star: <path {...common} d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>,
    angel: <><circle {...common} cx="12" cy="9" r="3"/><path {...common} d="M6 20c.5-4 2.5-6 6-6s5.5 2 6 6M5 6c2-3 5-4 7-1 2-3 5-2 7 1"/></>,
    trophy: <><path {...common} d="M7 4h10v5a5 5 0 0 1-10 0V4ZM12 14v4M8 21h8M9 18h6"/><path {...common} d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/></>,
    mail: <><rect {...common} x="3" y="5" width="18" height="14" rx="2"/><path {...common} d="m4 7 8 6 8-6"/></>,
    check: <path {...common} d="m5 12 4 4L19 6"/>,
    social: <circle {...common} cx="12" cy="12" r="8"/>,
    google: <text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="800" fill="currentColor" stroke="none">G</text>,
    apple: <><path {...common} fill="currentColor" d="M16.7 12.7c0-2.1 1.7-3.1 1.8-3.2-1-.1-2.2-1.1-3.7-1.1-1.3 0-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.6 1.1 8.7.8 1 1.6 2.1 2.8 2.1 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-.9 2.7-2 .9-1.3 1.3-2.6 1.3-2.7-.1 0-1.9-.8-1.9-3.9Z"/><path {...common} fill="currentColor" d="M14.3 6.8c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6.9.1 1.9-.5 2.5-1.2Z"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" className="svg-icon">{paths[name]}</svg>;
}

function AuthPage({ mode, onBack, onSwitch, onAuthenticated }: { mode: "signin" | "signup"; onBack: () => void; onSwitch: () => void; onAuthenticated: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [authError, setAuthError] = useState("");
  const isSignUp = mode === "signup";

  const completeAuth = async (provider?: "google" | "apple") => {
    setAuthError("");
    if (!supabase) { setAuthError("Supabase is not configured yet."); return; }
    if (provider) {
      const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin } });
      if (error) setAuthError(error.message);
      return;
    }
    const result = isSignUp ? await supabase.auth.signUp({ email, password }) : await supabase.auth.signInWithPassword({ email, password });
    if (result.error) { setAuthError(result.error.message); return; }
    setSubmitted(true); window.setTimeout(onAuthenticated, 450);
  };

  return (
    <main className="auth-page">
      <div className="auth-art" aria-hidden="true">
        <button className="auth-back" onClick={onBack}>← Back to BakaBoost</button>
        <div className="auth-art-copy">
          <span className="auth-kicker"><SvgIcon name="heart" size={12} filled /> For creators. By fans.</span>
          <h1>Small gifts.<br/><em>Big feelings.</em></h1>
          <p>Support the people you love and make every little moment feel special.</p>
          <div className="auth-art-stamp"><SvgIcon name="gift" size={25} /> Made with love</div>
        </div>
      </div>
      <section className="auth-panel">
        <div className="auth-brand"><span><SvgIcon name="bow" size={22} filled /></span> BakaBoost</div>
        <div className="auth-content">
          <div className="auth-heading">
            <p className="auth-eyebrow">Welcome to the community</p>
            <h2>{isSignUp ? "Create your account" : "Welcome back"}</h2>
            <p>{isSignUp ? "Start supporting creators in a more meaningful way." : "Pick up where your gifting journey left off."}</p>
          </div>
          <div className="auth-socials">
            <button onClick={() => void completeAuth("google")}><SvgIcon name="google" size={20} /> Continue with Google</button>
            <button onClick={() => void completeAuth("apple")}><SvgIcon name="apple" size={20} /> Continue with Apple</button>
          </div>
          <div className="auth-divider"><span>or continue with email</span></div>
          <form onSubmit={(event) => { event.preventDefault(); if (email && password) completeAuth(); }}>
            <label>Email address<input type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label>Password<div className="password-field"><input type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required /><span><SvgIcon name="lock" size={15} /></span></div></label>
            {!isSignUp && <div className="auth-options"><label className="remember"><input type="checkbox" /> Remember me</label><a href="#" onClick={async (event) => { event.preventDefault(); if (!supabase || !email) { setAuthError("Enter your email first."); return; } const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin }); if (error) setAuthError(error.message); else setForgotSent(true); }}>Forgot password?</a></div>}
            <button className="auth-submit" type="submit">{isSignUp ? "Create account" : "Sign in"}<span>→</span></button>
          </form>
          {submitted && <p className="auth-success"><SvgIcon name="check" size={15} /> You're all set. Welcome to BakaBoost.</p>}
          {forgotSent && <p className="auth-success"><SvgIcon name="mail" size={15} /> Reset instructions are on their way.</p>}
          {authError && <p className="auth-error" role="alert">{authError}</p>}
          <p className="auth-switch">{isSignUp ? "Already have an account?" : "New to BakaBoost?"} <button onClick={onSwitch}>{isSignUp ? "Sign in" : "Create an account"}</button></p>
          <p className="auth-legal">By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
      </section>
    </main>
  );
}

type ProfileView = "creator" | "user";
type UserDetails = { name: string; username: string; bio: string };

function RoleSetup({ onChoose }: { onChoose: (role: ProfileView) => void }) {
  return <main className="role-setup"><div className="role-card"><div className="auth-brand"><span><SvgIcon name="bow" size={22} filled /></span> BakaBoost</div><div className="role-heading"><span className="section-label">Welcome to BakaBoost</span><h1>How will you make this place yours?</h1><p>Choose your path and we will set up the right profile for you.</p></div><div className="role-options"><button onClick={() => onChoose("creator")}><span className="role-icon"><SvgIcon name="star" size={28} /></span><span><strong>I'm a creator</strong><small>Share your wishlist and let your community show up for you.</small></span><b>→</b></button><button onClick={() => onChoose("user")}><span className="role-icon"><SvgIcon name="gift" size={28} /></span><span><strong>I'm here to support</strong><small>Discover creators, send thoughtful gifts, and collect moments.</small></span><b>→</b></button></div></div></main>;
}

type ProfileRecord = { id: string; role: ProfileView; display_name: string; username: string; bio: string; spotify_enabled: boolean };
type WishlistRecord = { id: string; name: string; price: number; image_url: string | null };
type SpotifyRecord = { id: string; title: string; detail: string; spotify_url: string; cover_url: string | null };
type GiftRecord = { id: string; gift_name: string; sent_at: string; creator: { display_name: string } | null };

function ProfilePage({ view, onBack, onOpen }: { view: ProfileView; onBack: () => void; onOpen: (view: ProfileView) => void }) {
  const [spotifyEnabled, setSpotifyEnabled] = useState(true);
  const [notice, setNotice] = useState("");
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [form, setForm] = useState<UserDetails>({ name: "", username: "", bio: "" });
  const [wishlist, setWishlist] = useState<WishlistRecord[]>([]);
  const [recommendations, setRecommendations] = useState<SpotifyRecord[]>([]);
  const [gifts, setGifts] = useState<GiftRecord[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const isCreator = view === "creator";
  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2400); };

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      if (!supabase) { setLoading(false); return; }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      const { data: profile } = await supabase.from("profiles").select("id, role, display_name, username, bio, spotify_enabled").eq("id", user.id).eq("role", view).maybeSingle<ProfileRecord>();
      if (!profile) { setLoading(false); return; }
      setProfileId(profile.id); setSpotifyEnabled(profile.spotify_enabled); setDetails({ name: profile.display_name, username: profile.username, bio: profile.bio }); setForm({ name: profile.display_name, username: profile.username, bio: profile.bio });
      if (view === "creator") {
        const { data } = await supabase.from("wishlist_items").select("id, name, price, image_url").eq("creator_id", profile.id).order("created_at");
        setWishlist((data || []) as WishlistRecord[]);
      } else {
        const { data } = await supabase.from("gift_history").select("id, gift_name, sent_at, creator:creator_id(display_name)").eq("supporter_id", profile.id).order("sent_at", { ascending: false });
        setGifts((data || []) as GiftRecord[]);
      }
      const { data: spotifyData } = await supabase.from("spotify_recommendations").select("id, title, detail, spotify_url, cover_url").eq("profile_id", profile.id).order("sort_order");
      setRecommendations((spotifyData || []) as SpotifyRecord[]);
      setLoading(false);
    }
    void loadProfile();
  }, [isCreator]);

  const saveDetails = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.username.trim()) return;
    if (!supabase) { notify("Connect Supabase before saving your profile."); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { notify("Sign in is required to save your profile."); return; }
    const { data, error } = await supabase.from("profiles").upsert({ id: user.id, role: view, display_name: form.name.trim(), username: form.username.trim(), bio: form.bio.trim() }).select("id, role, display_name, username, bio, spotify_enabled").single();
    if (error) { notify(error.message); return; }
    const savedProfile = data as ProfileRecord;
    setProfileId(savedProfile.id); setDetails(form); setSpotifyEnabled(savedProfile.spotify_enabled); notify("Your profile details have been saved.");
  };

  return (
    <div className="profile-page">
      <nav className="profile-nav">
        <button className="profile-logo" onClick={onBack}><span><SvgIcon name="bow" size={19} filled /></span> BakaBoost</button>
        <div className="profile-nav-links">
          <button className={!isCreator ? "active" : ""} onClick={() => onOpen("user")}>My profile</button>
          <button className={isCreator ? "active" : ""} onClick={() => onOpen("creator")}>Creator profile</button>
        </div>
        <button className="profile-back" onClick={onBack}>Back home</button>
      </nav>

      <main className="profile-shell">
        {loading && <div className="profile-loading">Loading your profile...</div>}
        {!loading && !hasSupabaseConfig && <div className="profile-empty-banner">Supabase is not configured. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to load profile data.</div>}
        {!details && <section className="profile-section details-setup">
          <div className="setup-copy"><span className="section-label">One small step</span><h2>{isCreator ? "Set up your creator profile" : "Tell us a little about you"}</h2><p>{isCreator ? "Add your public details so supporters know who they are cheering on." : "Your details personalize your supporter profile and stay saved for your next visit."}</p></div>
          <form onSubmit={saveDetails} className="details-form">
            <label>{isCreator ? "Display name" : "Full name"}<input value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder={isCreator ? "Mina makes little things" : "Alex Rivera"} required /></label>
            <label>Username<input value={form.username} onChange={event => setForm({ ...form, username: event.target.value })} placeholder={isCreator ? "minamakes" : "alexcreates"} required /></label>
            <label className="details-bio">{isCreator ? "Creator bio" : "A little about you"}<textarea value={form.bio} onChange={event => setForm({ ...form, bio: event.target.value })} placeholder={isCreator ? "What do you make and love?" : "What brings you to BakaBoost?"} rows={3} /></label>
            <button className="pink-btn" type="submit">Save my profile <span>→</span></button>
          </form>
        </section>}
        <section className="profile-hero">
          <div className="profile-avatar">{details?.name?.charAt(0).toUpperCase() || "?"}</div>
          <div className="profile-heading">
            <span className="profile-kicker">{isCreator ? "Creator profile" : "Supporter profile"}</span>
            <h1>{details ? `${details.name}${isCreator ? "'s creator space." : "'s support space."}` : isCreator ? "Your creator space." : "Your support space."}</h1>
            <p>{details?.bio || (isCreator ? "Set up your profile to share your work and wishlist." : "Set up your profile to keep track of the creators and gifts that matter to you.")}</p>
            <div className="profile-meta"><span><SvgIcon name="heart" size={13} filled /> {isCreator ? `${wishlist.length} wishlist items` : `${gifts.length} gifts sent`}</span><span><SvgIcon name="gift" size={13} /> {isCreator ? "Wishlist" : "Supporter profile"}</span></div>
          </div>
          {!isCreator && <button onClick={() => notify("Creator discovery is coming next.")} className="pink-btn profile-primary">Explore creators <span>→</span></button>}
        </section>

        <div className="profile-layout">
          <div className="profile-main-column">
            {isCreator ? (
              <section className="profile-section wishlist-section">
                <div className="profile-section-heading"><div><span className="section-label">A little something</span><h2>My wishlist</h2></div><button onClick={() => notify("Showing all wishlist items.")} className="outline-action">View all <span>→</span></button></div>
                {wishlist.length ? <div className="wishlist-row">{wishlist.map(item => <article className="wishlist-item" key={item.id}><div className="wishlist-art">{item.image_url ? <img src={item.image_url} alt="" /> : <SvgIcon name="gift" size={33} />}</div><div><h3>{item.name}</h3><span>${Number(item.price).toFixed(2)}</span></div></article>)}</div> : <div className="profile-empty-state">No wishlist items yet. Add your first item from creator settings.</div>}
              </section>
            ) : (
              <section className="profile-section activity-section">
                <div className="profile-section-heading"><div><span className="section-label">Your little acts of kindness</span><h2>Gift activity</h2></div><button onClick={() => notify("Your complete gift history is coming next.")} className="outline-action">See history <span>→</span></button></div>
                {gifts.length ? gifts.map(item => <div className="activity-row" key={item.id}><div className="activity-icon"><SvgIcon name="gift" size={20} /></div><div><strong>{item.gift_name}</strong><span>Sent to {item.creator?.display_name || "a creator"}</span></div><time>{new Date(item.sent_at).toLocaleDateString()}</time></div>) : <div className="profile-empty-state">No gifts sent yet. Your gift history will appear here.</div>}
              </section>
            )}

            {details?.bio && <section className="profile-section notes-section"><span className="section-label">About {details.name}</span><blockquote>{details.bio}</blockquote></section>}
          </div>

          <aside className="profile-side-column">
            <section className="profile-section spotify-section">
              <div className="spotify-heading"><div className="spotify-mark">●</div><div><span className="section-label">Optional profile add-on</span><h2>Spotify picks</h2></div><button className={`toggle ${spotifyEnabled ? "on" : ""}`} aria-label="Toggle Spotify recommendations" onClick={() => setSpotifyEnabled(!spotifyEnabled)}><span /></button></div>
              {spotifyEnabled ? recommendations.length ? <><p className="spotify-intro">{isCreator ? "What I listen to while I draw, stream, and dream up new things." : "A few songs that have been keeping me company lately."}</p><div className="playlist-list">{recommendations.map((playlist, index) => <div className="playlist-row" key={playlist.id}><span className="playlist-cover" style={{ background: "#f8d5df" }}>{index + 1}</span><span><strong>{playlist.title}</strong><small>{playlist.detail}</small></span><button onClick={() => window.open(playlist.spotify_url, "_blank", "noopener,noreferrer")} aria-label={`Open ${playlist.title}`}>▶</button></div>)}</div><a className="spotify-link" href="https://open.spotify.com" target="_blank" rel="noreferrer">Open Spotify <span>↗</span></a></> : <div className="spotify-off">No Spotify recommendations have been added yet.</div> : <div className="spotify-off">Spotify recommendations are hidden from your profile.</div>}
            </section>
            <section className="profile-section profile-stats"><div><strong>{isCreator ? wishlist.length : gifts.length}</strong><span>{isCreator ? "wishlist items" : "gifts sent"}</span></div><div><strong>{recommendations.length}</strong><span>Spotify picks</span></div></section>
          </aside>
        </div>
      </main>
      {notice && <div className="site-toast profile-toast" role="status"><SvgIcon name="check" size={15} /> {notice}</div>}
    </div>
  );
}

export default function App() {
  const [authMode, setAuthMode] = useState<"signin" | "signup" | null>(null);
  const [setupRole, setSetupRole] = useState<ProfileView | "choose" | null>(null);
  const [profileView, setProfileView] = useState<ProfileView | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [liked, setLiked]     = useState<Set<number>>(new Set());
  const [email, setEmail]     = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [notice, setNotice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!supabase) { setAuthChecking(false); return; }
    let mounted = true;
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      setAuthChecking(false);
    };
    void checkSession();
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user && !authMode && !profileView && !setupRole) setSetupRole("choose");
    });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  if (authChecking) return <div className="app-loading">Loading BakaBoost...</div>;

  if (authMode) {
    return <AuthPage mode={authMode} onBack={() => setAuthMode(null)} onSwitch={() => setAuthMode(authMode === "signin" ? "signup" : "signin")} onAuthenticated={() => { setAuthMode(null); setSetupRole("choose"); }} />;
  }
  if (setupRole) {
    if (setupRole === "choose") return <RoleSetup onChoose={setSetupRole} />;
    return <ProfilePage view={setupRole} onBack={() => setSetupRole(null)} onOpen={setSetupRole} />;
  }
  if (profileView) {
    return <ProfilePage view={profileView} onBack={() => setProfileView(null)} onOpen={setProfileView} />;
  }

  const toggleLike = (id:number) => {
    setLiked(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });
  };

  return (
    <div style={{ fontFamily:"'Nunito',sans-serif", background:C.bg, color:C.text, minHeight:"100vh" }}>

      {/* ══ NAVBAR ══ */}
      <nav style={{ background:"#ffffff", borderBottom:"1px solid #f1edf0", position:"sticky", top:0, zIndex:50 }}>
        <div className="nav-inner" style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", height:48, gap:14 }}>
          {/* Logo */}
          <button className="brand-home" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0, border:0, background:"none", padding:0, cursor:"pointer" }}>
            <span className="brand-mark"><SvgIcon name="bow" size={20} filled /></span>
            <span style={{ fontWeight:900, fontSize:18, color:"#171717", letterSpacing:"-0.03em" }}>BakaBoost</span>
          </button>

          {/* Search */}
          <div className="nav-search" style={{ flex:1, maxWidth:260, margin:"0 16px", position:"relative" }}>
            <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:C.textSoft }}><SvgIcon name="search" size={14} /></span>
            <input
              placeholder="Search for creators..."
              value={searchQuery}
              onChange={e=>setSearchQuery(e.target.value)}
              style={{
                width:"100%", paddingLeft:34, paddingRight:14, paddingTop:7, paddingBottom:7,
                borderRadius:999, border:"1px solid #e8e5e7", background:"#ffffff",
                fontSize:13, fontFamily:"'Nunito',sans-serif", color:C.text, outline:"none",
              }}
            />
          </div>

          {/* Links */}
          <div className="nav-links" style={{ display:"flex", gap:26, alignItems:"center", marginLeft:"auto" }}>
              {['Explore','For creators','How it works','Blog'].map(l=>(
                <a key={l} href={l === "Explore" ? "#user-profile" : l === "For creators" ? "#creator-profile" : "#"} className="nav-link" onClick={(event) => { if (l === "Explore" || l === "For creators") { event.preventDefault(); setProfileView(l === "Explore" ? "user" : "creator"); } }}>{l}</a>
            ))}
          </div>

          {/* Auth */}
          <div className="nav-actions" style={{ display:"flex", gap:10, alignItems:"center", flexShrink:0, marginLeft:8 }}>
            <button onClick={() => setAuthMode("signin")} style={{ background:"none", border:"none", cursor:"pointer", fontWeight:800, fontSize:12, color:"#222" }}>Log in</button>
            <button onClick={() => setAuthMode("signup")} className="pink-btn" style={{ padding:"8px 18px", fontSize:12 }}>Sign up</button>
            <button aria-label="Open your bag" onClick={() => notify("Your bag is ready for gifts.")} style={{ width:32, height:32, borderRadius:"50%", background:"#fff", border:"1px solid #e8e5e7", display:"flex", alignItems:"center", justifyContent:"center", color:"#444", cursor:"pointer" }}><SvgIcon name="bag" size={16} /></button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{
        position:"relative", overflow:"hidden", minHeight:432,
        display:"flex", alignItems:"center",
      }}>
        {/* Full-width background image */}
        <img
          src={heroBg}
          alt="Anime girl kawaii background"
          style={{
            position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center top", zIndex:0,
          }}
        />
        {/* Soft left-side gradient overlay so text stays readable */}
        <div style={{
          position:"absolute", inset:0, zIndex:1,
          background:"linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 29%, rgba(255,255,255,0.66) 47%, rgba(255,224,235,0.18) 68%, transparent 100%)",
        }}/>

        {/* Text content — left half only */}
        <div className="hero-inner" style={{ maxWidth:1200, margin:"0 auto", padding:"72px 24px 64px", width:"100%", position:"relative", zIndex:2 }}>
          <div style={{ maxWidth:480 }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:6,
              background:"rgba(255,255,255,0.72)", backdropFilter:"blur(8px)",
              borderRadius:999, padding:"5px 14px",
              fontSize:10, fontWeight:800, color:"#333",
              textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:24,
              border:"1px solid rgba(255,140,175,0.4)",
            }}><SvgIcon name="heart" size={12} filled /> For creators. By fans.</div>

            <h1 style={{ fontWeight:900, fontSize:"clamp(2.1rem,4.5vw,3.4rem)", lineHeight:1.08, letterSpacing:"-0.03em", color:"#101010", margin:0, textShadow:"none" }}>
              Support creators.<br/>
              Send more than<br/>
              <em style={{ fontStyle:"italic", color:C.pink, fontWeight:900 }}>just a gift.</em>
            </h1>

            <p style={{ marginTop:18, fontSize:14, lineHeight:1.55, color:"#383838", maxWidth:360, fontWeight:600 }}>
              BakaBoost is the best way to support the people you love. Send gifts, earn their hearts, and be part of their journey.
            </p>

            <div style={{ marginTop:28, display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
              <button onClick={() => setAuthMode("signup")} className="pink-btn" style={{ padding:"13px 30px", fontSize:14, boxShadow:"0 6px 24px rgba(255,77,141,.35)" }}>
                Join BakaBoost →
              </button>
            </div>

            <div style={{ marginTop:20, display:"flex", gap:20, flexWrap:"wrap" }}>
              {["Private & anonymous","100% secure","Made with love"].map(t=>(
                <div key={t} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11.5, color:"#4a4a4a", fontWeight:700 }}>
                  <span style={{ color:C.pink, fontWeight:900 }}><SvgIcon name="check" size={12} /></span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="how-section" aria-labelledby="how-it-works-title">
        <div className="how-shell">
          <div className="how-heading">
            <span className="how-kicker"><SvgIcon name="heart" size={12} filled /> Simple, sweet, and meaningful</span>
            <h2 id="how-it-works-title">How it works <span aria-hidden="true">✦</span></h2>
            <p>Three little steps to make someone's day.</p>
          </div>

          <div className="how-grid">
            {[
              { number:"01", image:howCreate, title:"Create your wishlist", desc:"Add the things you love and let your community know what would make you smile." },
              { number:"02", image:howShare, title:"Share your link", desc:"Post your wishlist anywhere your fans can find you, from socials to your bio." },
              { number:"03", image:howGift, title:"Get boosted", desc:"Your fans choose a gift, and we take care of the rest. Feel the love." },
            ].map((step, index) => (
              <div className={`how-step how-step-${index + 1}`} key={step.number}>
                <div className="how-image-wrap">
                  <img src={step.image} alt="" className="how-image" />
                  <span className="how-number">{step.number}</span>
                </div>
                <div className="how-step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                {index < 2 && <span className="how-arrow" aria-hidden="true">♡</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURE ICONS ROW ══ */}
      <section className="feature-section" style={{ background:C.bg, padding:"18px 24px 28px" }}>
        <div className="feature-grid" style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, background:"rgba(255,255,255,.72)", border:`1.5px solid ${C.border}`, borderRadius:18, overflow:"hidden", boxShadow:"0 3px 18px rgba(255,77,141,.06)" }}>
          {[
            { icon:"mask", title:"Remain Anonymous",     desc:"Support your favorite creators without revealing your identity." },
            { icon:"search", title:"Discover Creators",    desc:"Find amazing creators and explore their wishlists." },
            { icon:"lock", title:"100% Safe & Secure",   desc:"Your privacy and security are our top priority." },
            { icon:"gift", title:"Free To Get Started",  desc:"Create your wishlist and start receiving gifts for free." },
          ].map(f=>(
            <div key={f.title} className="feature-item" style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:10, padding:"20px 18px", borderRight:`1px solid ${C.border}` }}>
              <div className="icon-circle" style={{ width:72, height:72, fontSize:32, background:"#fff0f6", color:C.pink, boxShadow:"0 5px 16px rgba(255,77,141,.1)" }}><SvgIcon name={f.icon as IconName} size={36} /></div>
              <div style={{ fontWeight:800, fontSize:14, color:C.pinkDark }}>{f.title}</div>
              <div style={{ fontSize:12.5, color:C.textMid, lineHeight:1.55 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ POPULAR GIFTS ══ */}
      <section className="gifts-section" style={{ background:"#ffffff", padding:"34px 24px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
            <div>
              <h2 style={{ fontWeight:900, fontSize:22, color:"#171717", margin:0, display:"flex", alignItems:"center", gap:6 }}>
                Popular gifts <SvgIcon name="heart" size={15} filled />
              </h2>
              <div style={{ fontSize:12, color:"#777", marginTop:4 }}>Discover what fans are wishing for</div>
            </div>
            <a className="explore-gifts" href="#gifts" onClick={(event) => { event.preventDefault(); document.querySelector('.gift-grid')?.scrollIntoView({ behavior:"smooth", block:"center" }); }} style={{ fontSize:12, fontWeight:800, color:C.pink, textDecoration:"none", border:`1px solid ${C.border}`, borderRadius:999, padding:"8px 14px" }}>Explore all gifts →</a>
          </div>

          <div className="gift-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14 }}>
            {GIFTS.filter(g => `${g.name} ${g.brand}`.toLowerCase().includes(searchQuery.toLowerCase())).map(g=>(
              <div key={g.id} className="product-card">
                <div style={{ position:"relative", background:"#fff" }}>
                  <img src={g.img} alt={g.name} className="img-pink"/>
                  <button
                    className={`heart-btn${liked.has(g.id)?" active":""}`}
                    style={{ position:"absolute", top:10, right:10 }}
                    onClick={()=>toggleLike(g.id)}
                  >
                    <SvgIcon name="heart" size={14} filled={liked.has(g.id)} />
                  </button>
                </div>
                <div style={{ padding:"12px 14px 14px" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#777", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:3 }}>{g.brand}</div>
                  <div style={{ fontSize:13, fontWeight:800, color:"#222", marginBottom:10, lineHeight:1.35 }}>{g.name}</div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontWeight:900, fontSize:16, color:"#222" }}>{g.price}</span>
                    <button aria-label={`Add ${g.name} to your bag`} onClick={() => notify(`${g.name} added to your bag.`)} className="add-circle">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CREATORS LOVE ══ */}
      <section style={{ background:"#ffffff", padding:"42px 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <h2 style={{ fontWeight:900, fontSize:22, color:"#171717", margin:"0 0 22px 0", display:"flex", alignItems:"center", gap:6 }}>
            Why creators love BakaBoost <SvgIcon name="heart" size={15} filled />
          </h2>
          <div className="why-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
            {WHY.map(c=>(
              <div key={c.title} className="card-pink" style={{ padding:22 }}>
                <div className="icon-circle" style={{ width:50, height:50, fontSize:24, marginBottom:14, color:C.pink }}><SvgIcon name={c.icon as IconName} size={25} /></div>
                <div style={{ fontWeight:800, fontSize:14, color:C.pinkDark, marginBottom:8 }}>{c.title}</div>
                <div style={{ fontSize:13, color:C.textMid, lineHeight:1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMMUNITY BADGES ══ */}
      <section className="badges-section" style={{ background:"#ffffff", padding:"18px 24px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="badge-grid" style={{ display:"grid", gridTemplateColumns:"1.25fr repeat(6,1fr)", gap:8, border:`1px solid ${C.border}`, borderRadius:16, padding:8 }}>
            <div className="badge-intro" style={{ padding:"10px 12px", display:"flex", flexDirection:"column", alignItems:"flex-start" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <h2 style={{ fontWeight:900, fontSize:18, color:"#171717", margin:0 }}>Community Badges</h2>
                <span style={{ color:C.pink, fontSize:16, fontWeight:900 }}>+</span>
              </div>
              <p style={{ fontSize:11, color:"#777", lineHeight:1.45, margin:"0 0 12px" }}>Collect badges.<br/>Show your support.</p>
              <p style={{ fontSize:10, color:"#777", lineHeight:1.45, margin:"0 0 12px" }}>Unlock badges by supporting creators, reaching milestones, and being an amazing part of the BakaBoost community.</p>
              <a href="#badges" onClick={(event) => { event.preventDefault(); document.querySelector('.badges-section')?.scrollIntoView({ behavior:"smooth", block:"center" }); }} style={{ fontSize:10, color:C.pink, fontWeight:800, textDecoration:"none", borderBottom:`1px solid ${C.pink}`, paddingBottom:2 }}>View all badges</a>
            </div>
          {BADGES.map(b=>(
              <div
                key={b.name}
                className="badge-box"
                style={{
                  background: b.unlocked ? "#ffffff" : "#fff8fa",
                  border: `1.5px solid ${b.unlocked ? "#ffc2da" : "#f5c0d2"}`,
                  borderRadius:16,
                  opacity: b.unlocked ? 1 : 0.55,
                }}
              >
                <div style={{
                  width:56, height:56, borderRadius:"50%", fontSize:28,
                  background: b.unlocked ? "#ffd6e8" : "#f7c8da",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow: b.unlocked ? "0 4px 14px rgba(255,77,141,.18)" : "none",
                }}>
                  <SvgIcon name={b.icon as IconName} size={28} />
                </div>
                  <div className="badge-name" style={{ fontWeight:800, fontSize:12, color: b.unlocked ? C.pinkDark : C.textSoft }}>{b.name}</div>
                <div style={{ fontSize:11, color: b.unlocked ? C.textMid : C.textSoft, lineHeight:1.45 }}>{b.desc}</div>
                <div style={{
                  fontSize:11, fontWeight:800, padding:"2px 10px", borderRadius:999,
                  background: b.unlocked ? "#ffc2da" : "#f5c0d2",
                  color: b.unlocked ? C.pinkDark : C.textSoft,
                }}>
                  {b.unlocked ? "Unlocked" : "Locked"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ══ */}
      <section className="newsletter-section" style={{ padding:"18px 24px 24px", background:"#ffffff" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="newsletter-box" style={{
            background:"#fff7fa", border:`1px solid ${C.border}`,
            borderRadius:16, padding:"20px 30px",
            display:"flex", alignItems:"center", justifyContent:"space-between", gap:32, flexWrap:"wrap",
          }}>
            <div className="newsletter-envelope" style={{ color:C.pink, background:"#ffe5ef", borderRadius:"9px 9px 16px 16px", width:112, height:72, display:"flex", alignItems:"center", justifyContent:"center", transform:"rotate(-3deg)" }}>
              <SvgIcon name="mail" size={48} />
            </div>
            <div>
              <h3 style={{ fontWeight:900, fontSize:"clamp(1.4rem,3vw,2rem)", color:"#171717", margin:"0 0 4px 0", letterSpacing:"-0.02em" }}>
                Stay in the loop <SvgIcon name="mail" size={20} />
              </h3>
              <p style={{ fontSize:12, color:"#777", margin:0 }}>
                Get gift ideas, creator stories, and little surprises to your inbox.
              </p>
            </div>
            {subscribed ? (
              <div style={{ fontWeight:800, fontSize:16, color:C.pink }}><SvgIcon name="check" size={17} /> You're in! Welcome!</div>
            ) : (
              <div className="newsletter-form" style={{ display:"flex", gap:8, flexShrink:0 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  style={{
                    padding:"10px 18px", borderRadius:999, border:`1px solid ${C.border}`,
                    fontSize:14, fontFamily:"'Nunito',sans-serif",
                    outline:"none", width:230, color:C.pinkDark,
                    background:"#ffffff",
                  }}
                />
                <button
                  className="pink-btn"
                  style={{ padding:"10px 22px", fontSize:13, background:C.pink, color:"#fff" }}
                  onClick={()=>{ if(email.includes("@")) { setSubscribed(true); notify("You are on the list."); } else notify("Enter a valid email to subscribe."); }}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"#ffffff", borderTop:`1px solid ${C.border}`, padding:"30px 24px 22px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:36 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:14 }}>
                <span style={{ color:C.pinkDark }}><SvgIcon name="bow" size={22} filled /></span>
                <span style={{ fontWeight:900, fontSize:18, color:"#171717" }}>BakaBoost</span>
              </div>
              <p style={{ fontSize:13, color:C.textMid, lineHeight:1.7, maxWidth:230 }}>
                A platform where fans support the creators they love through meaningful gifts.
              </p>
              <div style={{ display:"flex", gap:8, marginTop:16 }}>
                {["social","social","social"].map((icon, index)=>(
                  <div key={`${icon}-${index}`} style={{
                    width:32, height:32, borderRadius:"50%",
                    background:"#fff0f6", border:`1px solid ${C.border}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:14, cursor:"pointer",
                  }}><SvgIcon name={icon as IconName} size={14} /></div>
                ))}
              </div>
            </div>

            {[
              { heading:"Platform", links:["Explore","For Creators","How It Works","Pricing"] },
              { heading:"Company",  links:["About","Blog","Careers","Press"] },
              { heading:"Support",  links:["Help Center","Safety","Privacy","Terms"] },
            ].map(col=>(
              <div key={col.heading}>
                <div style={{ fontWeight:900, fontSize:12, color:"#222", marginBottom:14, textTransform:"uppercase", letterSpacing:"0.07em" }}>{col.heading}</div>
                <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:10 }}>
                  {col.links.map(l=>(
                    <li key={l}>
                      <a href="#" onClick={(event) => { event.preventDefault(); notify(`${l} is coming soon.`); }}
                        style={{ fontSize:13, color:"#777", textDecoration:"none", fontWeight:700, transition:"color .2s" }}
                        onMouseOver={e=>{ e.currentTarget.style.color=C.pinkDark; }}
                        onMouseOut={e=>{ e.currentTarget.style.color=C.textMid; }}
                      >{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-bottom" style={{ borderTop:`1px solid ${C.border}`, paddingTop:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontSize:12, color:"#777" }}>© 2026 BakaBoost, Inc. All rights reserved.</div>
            <div style={{ fontSize:12, color:"#777" }}>Made with <SvgIcon name="heart" size={12} filled /> for creators everywhere</div>
          </div>
        </div>
      </footer>

      {notice && <div className="site-toast" role="status"><SvgIcon name="check" size={15} /> {notice}</div>}

    </div>
  );
}
