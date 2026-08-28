import { useEffect, useState } from "react";
import heroBg from "@/imports/ChatGPT_Image_Aug_25__2026__02_29_21_PM.png";
import howItWorksBg from "@/imports/how-it-works-bg.png";
import productOne from "@/imports/p1.jpg.jpg";
import productTwo from "@/imports/p2.jpg.jpg";
import productThree from "@/imports/p3.jpg.jpg";
import productFour from "@/imports/p4.jpg";
import productFive from "@/imports/p5.jpg";
import { hasSupabaseConfig, supabase } from "@/lib/supabase";

const GIFTS = [
  { id:1, name:"Sony WH-1000XM5",       brand:"Sony",        category:"Tech",        price:"$349", img:productOne },
  { id:2, name:"Fujifilm Instax Mini 12", brand:"Fujifilm",    category:"Creative",   price:"$79",  img:productTwo },
  { id:3, name:"Logitech MX Keys Mini",  brand:"Logitech",    category:"Tech",        price:"$99",  img:productThree },
  { id:4, name:"Blue Yeti Nano",         brand:"Blue",        category:"Creative",   price:"$99",  img:productFour },
  { id:5, name:"Coquette Tote Bag",      brand:"Accessories", category:"Accessories", price:"$35",  img:productFive },
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

type IconName = "bow" | "search" | "bag" | "mask" | "gift" | "lock" | "shield" | "heart" | "phone" | "crown" | "star" | "angel" | "trophy" | "mail" | "check" | "social" | "google" | "apple" | "music";

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
    music: <><path {...common} d="M9 18V5l10-2v13"/><circle {...common} cx="6" cy="18" r="3"/><circle {...common} cx="16" cy="16" r="3"/></>,
    google: <text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="800" fill="currentColor" stroke="none">G</text>,
    apple: <><path {...common} fill="currentColor" d="M16.7 12.7c0-2.1 1.7-3.1 1.8-3.2-1-.1-2.2-1.1-3.7-1.1-1.3 0-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.6 1.1 8.7.8 1 1.6 2.1 2.8 2.1 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-.9 2.7-2 .9-1.3 1.3-2.6 1.3-2.7-.1 0-1.9-.8-1.9-3.9Z"/><path {...common} fill="currentColor" d="M14.3 6.8c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6.9.1 1.9-.5 2.5-1.2Z"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" className="svg-icon">{paths[name]}</svg>;
}

function AuthPage({ mode, onBack, onSwitch, onReset, onAuthenticated }: { mode: "signin" | "signup" | "reset"; onBack: () => void; onSwitch: () => void; onReset: () => void; onAuthenticated: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [authError, setAuthError] = useState("");
  const isSignUp = mode === "signup";
  const isReset = mode === "reset";

  const completeAuth = async (provider?: "google" | "apple") => {
    setAuthError("");
    if (!supabase) { setAuthError("Supabase is not configured yet."); return; }
    if (provider) {
      const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin } });
      if (error) setAuthError(error.message);
      return;
    }
    if (isReset) {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) { setAuthError(error.message); return; }
      setSubmitted(true); window.setTimeout(onAuthenticated, 450); return;
    }
    const result = isSignUp ? await supabase.auth.signUp({ email, password }) : await supabase.auth.signInWithPassword({ email, password });
    if (result.error) { setAuthError(result.error.message); return; }
    if (!result.data.session) {
      setAuthError(isSignUp ? "Check your email to confirm your account, then sign in before creating your profile." : "No active session was created. Please sign in again.");
      return;
    }
    setSubmitted(true); window.setTimeout(onAuthenticated, 450);
  };

  return (
    <main className="auth-page">
      <div className="auth-art" aria-hidden="true" style={{ backgroundImage:`linear-gradient(135deg, rgba(255,247,250,.9), rgba(255,224,237,.7)), url("${heroBg}")` }}>
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
            <h2>{isReset ? "Choose a new password" : isSignUp ? "Create your account" : "Welcome back"}</h2>
            <p>{isReset ? "Set a new password for your BakaBoost account." : isSignUp ? "Start supporting creators in a more meaningful way." : "Pick up where your gifting journey left off."}</p>
          </div>
          {!isReset && <div className="auth-socials">
            <button onClick={() => void completeAuth("google")}><SvgIcon name="google" size={20} /> Continue with Google</button>
            <button onClick={() => void completeAuth("apple")}><SvgIcon name="apple" size={20} /> Continue with Apple</button>
          </div>}
          {!isReset && <div className="auth-divider"><span>or continue with email</span></div>}
          <form onSubmit={(event) => { event.preventDefault(); if ((isReset && password) || (!isReset && email && password)) void completeAuth(); }}>
            {!isReset && <label>Email address<input type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>}
            <label>Password<div className="password-field"><input type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required /><span><SvgIcon name="lock" size={15} /></span></div></label>
            {!isSignUp && !isReset && <div className="auth-options"><label className="remember"><input type="checkbox" /> Remember me</label><a href="#" onClick={async (event) => { event.preventDefault(); if (!supabase || !email) { setAuthError("Enter your email first."); return; } const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/#recovery` }); if (error) setAuthError(error.message); else setForgotSent(true); }}>Forgot password?</a></div>}
            <button className="auth-submit" type="submit">{isReset ? "Update password" : isSignUp ? "Create account" : "Sign in"}<span>→</span></button>
          </form>
          {submitted && <p className="auth-success"><SvgIcon name="check" size={15} /> You're all set. Welcome to BakaBoost.</p>}
          {forgotSent && <p className="auth-success"><SvgIcon name="mail" size={15} /> Reset instructions are on their way.</p>}
          {authError && <p className="auth-error" role="alert">{authError}</p>}
          {!isReset && <p className="auth-switch">{isSignUp ? "Already have an account?" : "New to BakaBoost?"} <button onClick={onSwitch}>{isSignUp ? "Sign in" : "Create an account"}</button></p>}
          {isReset && <p className="auth-switch"><button onClick={onReset}>Back to sign in</button></p>}
          <p className="auth-legal">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </div>
      </section>
    </main>
  );
}

type ProfileView = "creator" | "user";
type UserDetails = { name: string; username: string; bio: string };
type CartProduct = { id: string; name: string; price: string; img: string | null; brand: string; item_url?: string | null; creator_id?: string; creator_name?: string; wishlist_item_id?: string };
type CartItem = { gift: (typeof GIFTS[number] | CartProduct) & { item_url?: string | null }; quantity: number };
type UtilityPage = "cart" | "blog" | "explore" | "creators" | "terms" | "privacy" | null;
type GalleryRecord = { id: string; title: string; description: string; image_url: string; is_exclusive: boolean };
type ShopRecord = { id: string; name: string; description: string; price: number; image_url: string | null; product_url: string | null; product_type: string; is_active: boolean };
type MembershipRecord = { id: string; name: string; description: string; price: number; benefits: string[]; is_active: boolean };

function BrowserNavigation() {
  const [navigation, setNavigation] = useState({ index: 0, length: 0 });
  useEffect(() => {
    const sync = () => setNavigation({ index: Number(window.history.state?.bakaboostIndex || 0), length: Number(sessionStorage.getItem("bakaboost-history-length") || 1) });
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("bakaboost:navigation", sync);
    return () => { window.removeEventListener("popstate", sync); window.removeEventListener("bakaboost:navigation", sync); };
  }, []);
  const canGoBack = navigation.index > 0;
  const canGoForward = navigation.index < navigation.length - 1;
  return <div className="browser-navigation" aria-label="Page navigation"><span>Navigate</span><button type="button" disabled={!canGoBack} onClick={() => canGoBack && window.history.back()} aria-label="Go back" title="Back">&lt;</button><button type="button" disabled={!canGoForward} onClick={() => canGoForward && window.history.forward()} aria-label="Go forward" title="Forward">&gt;</button></div>;
}

function AppNavigation({ onHome, onExplore, onCreators, onHowItWorks, onCart, onProfile, authenticated, cartCount, onAuth }: { onHome: () => void; onExplore: () => void; onCreators: () => void; onHowItWorks: () => void; onCart: () => void; onProfile: () => void; authenticated: boolean; cartCount: number; onAuth: () => void }) {
  return <nav className="app-navigation">
    <button className="app-navigation-brand" type="button" onClick={onHome}><SvgIcon name="bow" size={19} filled /> <strong>BakaBoost</strong></button>
    <div className="app-navigation-links">
      <button type="button" onClick={onExplore}>Explore gifts</button>
      <button type="button" onClick={onCreators}>Creators</button>
      <button type="button" onClick={onHowItWorks}>How it works</button>
      <button type="button" onClick={() => { window.location.hash = "#blog"; }}>Blog</button>
    </div>
    <div className="app-navigation-actions">
      <button type="button" className="app-navigation-profile" onClick={authenticated ? onProfile : onAuth}>{authenticated ? "My profile" : "Log in"}</button>
      <button type="button" className="app-navigation-cart" onClick={onCart} aria-label={`Open your bag${cartCount ? ` with ${cartCount} items` : ""}`}><SvgIcon name="bag" size={15} />{cartCount > 0 && <b>{cartCount}</b>}</button>
    </div>
  </nav>;
}

function ProductRowControls({ target }: { target: string }) {
  const move = (direction: number) => document.querySelector<HTMLElement>(target)?.scrollBy({ left: direction * 260, behavior: "smooth" });
  return <div className="product-row-controls" aria-label="Browse this product row"><button type="button" onClick={() => move(-1)} aria-label="Previous products">&lt;</button><button type="button" onClick={() => move(1)} aria-label="More products">&gt;</button></div>;
}

function RoleSetup({ onChoose }: { onChoose: (role: ProfileView) => void }) {
  return <main className="role-setup"><div className="role-card"><div className="auth-brand"><span><SvgIcon name="bow" size={22} filled /></span> BakaBoost</div><div className="role-heading"><span className="section-label">Welcome to BakaBoost</span><h1>How will you make this place yours?</h1><p>Choose your path and we will set up the right profile for you.</p></div><div className="role-options"><button onClick={() => onChoose("creator")}><span className="role-icon"><SvgIcon name="star" size={28} /></span><span><strong>I'm a creator</strong><small>Share your wishlist and let your community show up for you.</small></span><b>→</b></button><button onClick={() => onChoose("user")}><span className="role-icon"><SvgIcon name="gift" size={28} /></span><span><strong>I'm here to support</strong><small>Discover creators, send thoughtful gifts, and collect moments.</small></span><b>→</b></button></div></div></main>;
}

function CreatorDirectoryPage({ onBack, onView }: { onBack: () => void; onView: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [creators, setCreators] = useState<CreatorRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    void supabase.from("profiles").select("id, display_name, username, bio").eq("role", "creator").order("created_at").then(({ data, error: loadError }) => { if (loadError) setError(loadError.message); else setCreators((data || []) as CreatorRecord[]); setLoading(false); });
  }, []);
  const visible = creators.filter(creator => `${creator.display_name} ${creator.username} ${creator.bio}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="utility-page creator-directory"><div className="directory-shell"><header className="directory-heading"><span className="section-label">Find someone to support</span><h1>Top picked by creators <SvgIcon name="heart" size={27} filled /></h1><p>Browse real creator wishlists and choose a thoughtful gift.</p></header><label className="directory-search"><SvgIcon name="search" size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search creators by name or username" /></label>{loading ? <div className="profile-loading">Finding creators...</div> : error ? <div className="profile-empty-state">Could not load creators: {error}</div> : visible.length ? <div className="creator-grid">{visible.map(creator => <button className="creator-card" key={creator.id} onClick={() => onView(creator.id)}><span className="creator-avatar">{creator.display_name.charAt(0).toUpperCase()}</span><span><strong>{creator.display_name}</strong><small>@{creator.username}</small><p>{creator.bio || "See this creator's curated wishlist."}</p></span><b>View wishlist <span>→</span></b></button>)}</div> : <div className="explore-empty"><SvgIcon name="search" size={28} /><h2>No creators found</h2><p>Try another name or username.</p></div>}</div></main>;
}

function CreatorStudio({ creatorId, isOwner }: { creatorId: string | null; isOwner: boolean }) {
  const [gallery, setGallery] = useState<GalleryRecord[]>([]);
  const [shop, setShop] = useState<ShopRecord[]>([]);
  const [memberships, setMemberships] = useState<MembershipRecord[]>([]);
  const [paidSupport, setPaidSupport] = useState(0);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ name: "", price: "", image: "", url: "" });
  useEffect(() => {
    if (!supabase || !creatorId) return;
    void Promise.all([
      supabase.from("gallery_items").select("id, title, description, image_url, is_exclusive").eq("creator_id", creatorId).order("created_at", { ascending: false }),
      supabase.from("shop_products").select("id, name, description, price, image_url, product_url, product_type, is_active").eq("creator_id", creatorId).order("created_at", { ascending: false }),
      supabase.from("memberships").select("id, name, description, price, benefits, is_active").eq("creator_id", creatorId).order("created_at"),
      supabase.from("tips").select("amount").eq("creator_id", creatorId).eq("status", "paid"),
    ]).then(([galleryResult, shopResult, membershipResult, tipsResult]) => {
      setGallery((galleryResult.data || []) as GalleryRecord[]);
      setShop((shopResult.data || []) as ShopRecord[]);
      setMemberships((membershipResult.data || []) as MembershipRecord[]);
      setPaidSupport((tipsResult.data || []).reduce((total, tip) => total + Number(tip.amount || 0), 0));
    });
  }, [creatorId]);
  const addShopProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase || !creatorId || !form.name.trim() || !form.price.trim()) return;
    const { data, error } = await supabase.from("shop_products").insert({ creator_id: creatorId, name: form.name.trim(), price: Number(form.price), image_url: form.image.trim() || null, product_url: form.url.trim() || null }).select("id, name, description, price, image_url, product_url, product_type, is_active").single();
    if (error) { setNotice(error.message); return; }
    setShop(previous => [data as ShopRecord, ...previous]); setForm({ name: "", price: "", image: "", url: "" }); setNotice("Shop product added.");
  };
  return <section className="creator-studio" aria-label="Creator studio">
    <header className="creator-studio-heading"><div><span className="section-label">Creator studio</span><h2>{isOwner ? "Shape your space" : "More from this creator"}</h2></div>{isOwner ? <div className="creator-studio-metrics"><span><b>${paidSupport.toFixed(2)}</b> paid support</span><span>{memberships.length} membership tiers</span></div> : <span className="creator-studio-status">Support this creator</span>}</header>
    {gallery.length > 0 && <div className="creator-gallery"><div className="creator-studio-subheading"><h3>Gallery</h3><span>{gallery.length} posts</span></div><div className="creator-gallery-grid">{gallery.map(item => <article key={item.id}><img src={item.image_url} alt={item.title} /><strong>{item.title}</strong>{item.description && <p>{item.description}</p>}</article>)}</div></div>}
    {shop.length > 0 && <div className="creator-shop"><div className="creator-studio-subheading"><h3>Shop</h3><span>{shop.length} products</span></div><div className="creator-shop-grid">{shop.map(item => <article key={item.id}>{item.image_url && <img src={item.image_url} alt="" />}<div><strong>{item.name}</strong><span>${Number(item.price).toFixed(2)}</span>{item.product_url && <a href={item.product_url} target="_blank" rel="noreferrer">View product <span>↗</span></a>}</div></article>)}</div></div>}
    {memberships.length > 0 && <div className="creator-memberships"><div className="creator-studio-subheading"><h3>Memberships</h3><span>Support tiers</span></div><div className="creator-membership-grid">{memberships.map(item => <article key={item.id}><strong>{item.name}</strong><b>${Number(item.price).toFixed(2)} / month</b><p>{item.description}</p><ul>{item.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul><button type="button" disabled>Join when payments are connected</button></article>)}</div></div>}
    {isOwner && <form className="creator-shop-form" onSubmit={addShopProduct}><h3>Add a shop product</h3><input value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="Product name" required /><input value={form.price} onChange={event => setForm({ ...form, price: event.target.value })} type="number" min="0" step="0.01" placeholder="Price" required /><input value={form.image} onChange={event => setForm({ ...form, image: event.target.value })} type="url" placeholder="Image URL (optional)" /><input value={form.url} onChange={event => setForm({ ...form, url: event.target.value })} type="url" placeholder="Product URL (optional)" /><button className="pink-btn" type="submit">Add product</button></form>}
    {notice && <p className="creator-studio-notice" role="status">{notice}</p>}
  </section>;
}

function CartPage({ items, onBack, onUpdate, onRemove, onCheckout, onPreparePurchase }: { items: CartItem[]; onBack: () => void; onUpdate: (id: string | number, delta: number) => void; onRemove: (id: string | number) => void; onCheckout: () => void; onPreparePurchase: (items: CartItem[]) => Promise<boolean> }) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.gift.price.replace(/[^0-9.]/g, "")) * item.quantity, 0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [checkout, setCheckout] = useState({ name: "", email: "", address: "", city: "", postal: "", country: "", payment: "card" });
  const completeCheckout = async (event: React.FormEvent) => {
    event.preventDefault();
    const prepared = await onPreparePurchase(items);
    if (!prepared) return;
    items.forEach(item => {
      if ("item_url" in item.gift && item.gift.item_url) window.open(item.gift.item_url, "_blank", "noopener,noreferrer");
    });
    setOrderPlaced(true);
    onCheckout();
  };
  return <main className="utility-page cart-page">
    <div className="utility-shell">
      <div className="utility-heading"><span className="section-label">A little something for someone special</span><h1>Your gift bag <SvgIcon name="bag" size={25} /></h1><p>{items.length ? `${items.reduce((sum, item) => sum + item.quantity, 0)} thoughtful gifts waiting to be sent.` : "Your bag is ready for something thoughtful."}</p></div>
      {items.length ? <>{!orderPlaced && <div className="cart-layout"><section className="cart-items" aria-label="Gift bag items">{items.map(item => <article className="cart-item" key={item.gift.id}><>{item.gift.img ? <img src={item.gift.img} alt={item.gift.name} /> : <div className="cart-product-placeholder"><SvgIcon name="gift" size={28} /></div>}</><div className="cart-item-info"><span>{item.gift.brand}</span><h2>{item.gift.name}</h2><strong>{item.gift.price}</strong>{"item_url" in item.gift && item.gift.item_url && <a className="wishlist-link" href={item.gift.item_url} target="_blank" rel="noreferrer">View product <span>↗</span></a>}</div><div className="cart-controls"><div><button aria-label={`Decrease ${item.gift.name} quantity`} onClick={() => onUpdate(item.gift.id, -1)}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${item.gift.name} quantity`} onClick={() => onUpdate(item.gift.id, 1)}>+</button></div><button className="cart-remove" onClick={() => onRemove(item.gift.id)}>Remove</button></div></article>)}</section><aside className="cart-summary"><span className="section-label">Your bag</span><h2>Ready to send some love?</h2><div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><div className="summary-row"><span>Amazon items</span><span>Purchased on Amazon</span></div><button className="pink-btn cart-checkout" onClick={() => setCheckoutOpen(true)}>Review purchase <span>→</span></button><small>Your payment and delivery are completed securely on Amazon.</small></aside></div>}{checkoutOpen && <form className="checkout-form" onSubmit={completeCheckout}><div className="checkout-form-heading"><div><span className="section-label">One last step</span><h2>Open your Amazon items</h2></div><button type="button" onClick={() => setCheckoutOpen(false)}>Close</button></div><p className="checkout-note">Your bag is ready. Open each Amazon product to complete payment and delivery there.</p><div className="amazon-cart-links">{items.filter(item => "item_url" in item.gift && item.gift.item_url).map(item => <a className="pink-btn" key={item.gift.id} href={item.gift.item_url || "#"} target="_blank" rel="noreferrer">Buy {item.gift.name} <span>↗</span></a>)}</div><button className="outline-action" type="button" onClick={() => void completeCheckout({ preventDefault: () => undefined } as React.FormEvent)}>Done reviewing</button></form>}{orderPlaced && <div className="order-success"><SvgIcon name="check" size={30} /><span className="section-label">Ready to purchase</span><h2>Your Amazon links are open.</h2><p>Complete payment and delivery on Amazon. Your bag is still here for the next visit.</p><button className="pink-btn" onClick={onBack}>Continue browsing</button></div>}</> : <div className="cart-empty"><div><SvgIcon name="bag" size={38} /></div><h2>Your gift bag is empty</h2><p>Find something lovely for a creator you care about.</p><button className="pink-btn" onClick={onBack}>Explore gifts <span>→</span></button></div>}
    </div>
  </main>;
}

function BlogPage({ onBack }: { onBack: () => void }) {
  const stories = [{ tag:"COMMUNITY", title:"The little gifts that become big memories", text:"Thoughtful support is more than a package. It is a tiny reminder that someone's work found its way to you.", image:heroBg }, { tag:"CREATOR NOTES", title:"Making room for the things you love", text:"A wishlist gives your community a simple, joyful way to show up for the work you make.", image:productTwo }, { tag:"BAKABOOST GUIDE", title:"Five ways to send a little extra love", text:"From a handwritten note to a perfectly timed surprise, kindness always looks good on you.", image:productFive }];
  return <main className="utility-page blog-page"><div className="blog-shell"><header className="blog-heading"><span className="section-label">The BakaBoost journal</span><h1>Little stories, <em>big feelings.</em></h1><p>Notes on creativity, community, and the joy of showing up for someone.</p></header><article className="blog-feature"><img src={stories[0].image} alt="A creator surrounded by thoughtful gifts" /><div><span className="blog-tag">{stories[0].tag}</span><h2>{stories[0].title}</h2><p>{stories[0].text}</p><button className="pink-btn" onClick={() => window.scrollTo({ top: 520, behavior: "smooth" })}>Read the story <span>→</span></button></div></article><div className="blog-grid">{stories.slice(1).map(story => <article className="blog-card" key={story.title}><img src={story.image} alt="" /><div><span className="blog-tag">{story.tag}</span><h2>{story.title}</h2><p>{story.text}</p><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Read more <span>→</span></button></div></article>)}</div></div></main>;
}

function LegalPage({ kind, onBack }: { kind: "terms" | "privacy"; onBack: () => void }) {
  const privacy = kind === "privacy";
  return <main className="utility-page legal-page"><article className="legal-shell"><span className="section-label">BakaBoost policy</span><h1>{privacy ? "Privacy Policy" : "Terms of Service"}</h1><p className="legal-updated">Effective August 27, 2026</p>{privacy ? <><h2>What we collect</h2><p>We collect the account, profile, wishlist, follow, post, comment, and purchase-intent information needed to provide BakaBoost. We do not collect or store your Amazon payment details.</p><h2>How we use it</h2><p>Your information powers creator profiles, community features, wishlist links, notifications, and secure account access. Public profile content is visible to visitors; private account information is not.</p><h2>Your choices</h2><p>You can update your profile, remove wishlist items, unfollow creators, and request account data deletion by contacting support.</p></> : <><h2>Using BakaBoost</h2><p>BakaBoost lets creators share products and lets supporters discover them through retailer links. Retailer purchases happen on the retailer's website and are governed by its terms.</p><h2>Community standards</h2><p>Keep posts, comments, profiles, and links lawful, respectful, and accurate. We may remove content or accounts that abuse the service or compromise another person's privacy.</p><h2>Affiliate disclosure</h2><p>Some product links may be affiliate links. The price you pay is not changed by an affiliate relationship.</p></>}</article></main>;
}

function ExplorePage({ liked, cartCount, onToggleLike, onAddToCart, onAddAmazonToWishlist, onOpenCart, onBack }: { liked: Set<number>; cartCount: number; onToggleLike: (id: number) => void; onAddToCart: (gift: typeof GIFTS[number]) => void; onAddAmazonToWishlist: (product: AmazonSearchResult) => void; onOpenCart: () => void; onBack: () => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All gifts");
  const [price, setPrice] = useState("Any price");
  const [sort, setSort] = useState("Recommended");
  const [amazonResults, setAmazonResults] = useState<AmazonSearchResult[]>([]);
  const [amazonSearching, setAmazonSearching] = useState(false);
  const [amazonNotice, setAmazonNotice] = useState("");
  const [selectedAmazonProduct, setSelectedAmazonProduct] = useState<AmazonSearchResult | null>(null);
  const categories = ["All gifts", ...Array.from(new Set(GIFTS.map(gift => gift.category)))];
  const searchAmazon = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedQuery = query.trim();
    if (normalizedQuery.length < 2) { setAmazonNotice("Enter at least two characters to search Amazon."); return; }
    if (!supabase) { setAmazonNotice("Amazon search is unavailable until Supabase is configured."); return; }
    setAmazonSearching(true); setAmazonNotice("");
    const cacheKey = `bakaboost-amazon-search:${normalizedQuery.toLowerCase()}`;
    try {
      const cached = window.sessionStorage.getItem(cacheKey);
      if (cached) setAmazonResults(JSON.parse(cached) as AmazonSearchResult[]);
    } catch { /* Continue with the live request when storage is unavailable. */ }
    const { data, error } = await supabase.functions.invoke("amazon-search", { body: { query: normalizedQuery } });
    setAmazonSearching(false);
    if (error || data?.error) { setAmazonNotice(error?.message || data?.error || "Amazon search failed."); return; }
    const products = (data?.products || []) as AmazonSearchResult[];
    setAmazonResults(products);
    try { window.sessionStorage.setItem(cacheKey, JSON.stringify(products)); } catch { /* Ignore unavailable storage. */ }
  };
  const visibleGifts = GIFTS.filter(gift => {
    const matchesQuery = `${gift.name} ${gift.brand} ${gift.category}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All gifts" || gift.category === category;
    const amount = Number(gift.price.replace("$", ""));
    const matchesPrice = price === "Any price" || (price === "Under $50" && amount < 50) || (price === "$50 - $150" && amount >= 50 && amount <= 150) || (price === "$150+" && amount > 150);
    return matchesQuery && matchesCategory && matchesPrice;
  }).sort((first, second) => sort === "Price: low to high" ? Number(first.price.slice(1)) - Number(second.price.slice(1)) : sort === "Price: high to low" ? Number(second.price.slice(1)) - Number(first.price.slice(1)) : first.id - second.id);
  const recommendations = [...GIFTS].sort((first, second) => {
    const firstMatch = `${first.name} ${first.brand} ${first.category}`.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
    const secondMatch = `${second.name} ${second.brand} ${second.category}`.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
    return secondMatch - firstMatch || first.id - second.id;
  }).slice(0, 3);
  const hasProducts = visibleGifts.length > 0 || amazonResults.length > 0;
  return <main className="utility-page explore-page">
    <div className="explore-particles" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <span key={index} className={`explore-particle explore-particle-${index + 1}`} />)}</div>
    <div className="explore-shell">
      <header className="explore-heading"><div><span className="section-label">Find something thoughtful</span><h1>Explore all gifts <SvgIcon name="gift" size={25} /></h1><p>Little surprises, chosen for the creators you love.</p></div><div className="explore-count"><strong>{visibleGifts.length}</strong><span>gifts found</span></div></header>
      <section className="smart-picks" aria-label="Smart recommendations"><div className="smart-picks-heading"><span className="smart-spark"><SvgIcon name="star" size={17} filled /></span><div><strong>Smart picks for you</strong><span>{query ? `Matched to “${query}”` : "Based on what the BakaBoost community loves"}</span></div></div><div className="smart-pick-list">{recommendations.map(gift => <button className="smart-pick" key={gift.id} onClick={() => onAddToCart(gift)}><img src={gift.img} alt="" /><span><strong>{gift.name}</strong><small>{gift.category} · {gift.price}</small></span><SvgIcon name="bag" size={15} /></button>)}</div></section>
      <div className="explore-controls"><form className="explore-search" onSubmit={searchAmazon}><SvgIcon name="search" size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search gifts or Amazon products" /><button type="submit" disabled={amazonSearching}>{amazonSearching ? "Searching" : "Search Amazon"}</button></form><div className="explore-selects"><label>Category<select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(option => <option key={option}>{option}</option>)}</select></label><label>Price<select value={price} onChange={event => setPrice(event.target.value)}><option>Any price</option><option>Under $50</option><option>$50 - $150</option><option>$150+</option></select></label><label>Sort<select value={sort} onChange={event => setSort(event.target.value)}><option>Recommended</option><option>Price: low to high</option><option>Price: high to low</option></select></label></div></div>
      {hasProducts ? <div className="explore-grid" aria-live="polite">{visibleGifts.map(gift => <article className="explore-product" key={`gift-${gift.id}`}><div className="explore-product-image"><img src={gift.img} alt={gift.name} /><button className={`heart-btn${liked.has(gift.id) ? " active" : ""}`} aria-label={`${liked.has(gift.id) ? "Remove" : "Add"} ${gift.name} from favorites`} onClick={() => onToggleLike(gift.id)}><SvgIcon name="heart" size={15} filled={liked.has(gift.id)} /></button></div><div className="explore-product-copy"><span>{gift.category} · {gift.brand}</span><h2>{gift.name}</h2><div><strong>{gift.price}</strong><button className="add-circle" aria-label={`Add ${gift.name} to your bag`} onClick={() => onAddToCart(gift)}>+</button></div></div></article>)}{amazonResults.map(product => <article className="explore-product" key={`amazon-${product.asin}`} onClick={() => setSelectedAmazonProduct(product)}><div className="explore-product-image">{product.image_url ? <img src={product.image_url} alt={product.title} /> : <div className="explore-product-placeholder"><SvgIcon name="gift" size={30} /></div>}</div><div className="explore-product-copy"><span>Amazon pick</span><h2>{product.title}</h2><div><strong>{product.price}</strong><button className="add-circle" aria-label={`Add ${product.title} to a creator wishlist`} onClick={event => { event.stopPropagation(); onAddAmazonToWishlist(product); }}>+</button></div></div></article>)}</div> : <div className="explore-empty"><SvgIcon name="search" size={28} /><h2>No gifts found</h2><p>Try a different search or clear one of the filters.</p><button className="pink-btn" onClick={() => { setQuery(""); setCategory("All gifts"); setPrice("Any price"); }}>Clear filters</button></div>}
      {amazonNotice && <p className="amazon-explore-notice" role="status">{amazonNotice}</p>}
    </div>
    {selectedAmazonProduct && <div className="product-modal-backdrop" role="presentation" onClick={() => setSelectedAmazonProduct(null)}><section className="product-modal" role="dialog" aria-modal="true" aria-label="Amazon product details" onClick={event => event.stopPropagation()}><button className="product-modal-close" type="button" onClick={() => setSelectedAmazonProduct(null)} aria-label="Close product details">×</button><div className="product-modal-image">{selectedAmazonProduct.image_url ? <img src={selectedAmazonProduct.image_url} alt="" /> : <SvgIcon name="gift" size={42} />}</div><div className="product-modal-copy"><span className="section-label">Amazon product</span><h2>{selectedAmazonProduct.title}</h2><strong className="product-modal-price">{selectedAmazonProduct.price}</strong><div className="product-modal-detail"><h3>About this product</h3><p>{selectedAmazonProduct.description || "Product details are available on the Amazon listing."}</p></div><div className="product-modal-actions"><button className="pink-btn" type="button" onClick={() => { onAddAmazonToWishlist(selectedAmazonProduct); setSelectedAmazonProduct(null); }}>Add to creator wishlist <span>+</span></button><a className="outline-action" href={selectedAmazonProduct.product_url} target="_blank" rel="noreferrer">View on Amazon <span>↗</span></a></div></div></section></div>}
  </main>;
}

type ProfileRecord = { id: string; role: ProfileView; display_name: string; username: string; bio: string; spotify_enabled: boolean };
type CreatorRecord = Pick<ProfileRecord, "id" | "display_name" | "username" | "bio">;
type WishlistRecord = { id: string; creator_id?: string; name: string; price: number; asin?: string | null; description?: string; rating?: string; review_count?: string; availability?: string; image_url: string | null; item_url?: string | null };
type AmazonSearchResult = { asin: string; title: string; name?: string; id?: string; price: string; description: string; rating: string; review_count: string; availability: string; image_url: string | null; product_url: string; item_url?: string | null; source: "amazon" };
type SpotifySearchResult = { kind: "track" | "playlist"; id: string; title: string; detail: string; spotify_url: string; cover_url: string | null };
type SpotifyRecord = { id: string; title: string; detail: string; spotify_url: string; cover_url: string | null };
type GiftRecord = { id: string; gift_name: string; sent_at: string; creator: { display_name: string } | null };
type PostRecord = { id: string; body: string; image_url: string | null; created_at: string };
type PostComment = { id: string; post_id: string; body: string; created_at: string; author: { display_name: string } | null };

function spotifyEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.hostname !== "open.spotify.com") return null;
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length < 2 || !["track", "album", "playlist", "artist", "show", "episode"].includes(parts[0])) return null;
    return `https://open.spotify.com/embed/${parts[0]}/${parts[1]}?utm_source=generator`;
  } catch {
    return null;
  }
}

function ProfilePage({ view, creatorId, onBack, onOpen, onExploreGifts, onExploreCreators, onCart, onAddToCart, cartCount, onSignOut }: { view: ProfileView; creatorId?: string; onBack: () => void; onOpen: (view: ProfileView) => void; onExploreGifts: () => void; onExploreCreators: () => void; onCart: () => void; onAddToCart: (product: CartProduct) => void; cartCount: number; onSignOut: () => void }) {
  const [spotifyEnabled, setSpotifyEnabled] = useState(true);
  const [notice, setNotice] = useState("");
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [form, setForm] = useState<UserDetails>({ name: "", username: "", bio: "" });
  const [wishlist, setWishlist] = useState<WishlistRecord[]>([]);
  const [creatorWishlist, setCreatorWishlist] = useState<WishlistRecord[]>([]);
  const [creatorName, setCreatorName] = useState("");
  const [loadError, setLoadError] = useState("");
  const [recommendations, setRecommendations] = useState<SpotifyRecord[]>([]);
  const [gifts, setGifts] = useState<GiftRecord[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlistForm, setWishlistForm] = useState({ name: "", price: "", image_url: "", item_url: "" });
  const [spotifyForm, setSpotifyForm] = useState({ title: "", detail: "", spotify_url: "" });
  const [showWishlistForm, setShowWishlistForm] = useState(false);
  const [showSpotifyForm, setShowSpotifyForm] = useState(false);
  const [spotifyQuery, setSpotifyQuery] = useState("");
  const [spotifyResults, setSpotifyResults] = useState<SpotifySearchResult[]>([]);
  const [spotifySearching, setSpotifySearching] = useState(false);
  const [amazonQuery, setAmazonQuery] = useState("");
  const [amazonResults, setAmazonResults] = useState<AmazonSearchResult[]>([]);
  const [amazonSearching, setAmazonSearching] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AmazonSearchResult | WishlistRecord | null>(null);
  const [connected, setConnected] = useState(false);
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [postBody, setPostBody] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [postLikeCounts, setPostLikeCounts] = useState<Record<string, number>>({});
  const [postComments, setPostComments] = useState<Record<string, PostComment[]>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [commentingPost, setCommentingPost] = useState<string | null>(null);
  const isCreator = view === "creator";
  const isOwner = !creatorId;
  const canEdit = isCreator && isOwner;
  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2400); };

  const addWishlistItem = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!wishlistForm.name.trim() || !wishlistForm.price.trim()) return;
    if (supabase && profileId) {
      const { data, error } = await supabase.from("wishlist_items").insert({ creator_id: profileId, name: wishlistForm.name.trim(), price: Number(wishlistForm.price), image_url: wishlistForm.image_url.trim() || null, item_url: wishlistForm.item_url.trim() || null }).select("id, name, price, image_url, item_url").single();
      if (error) { notify(error.message); return; }
      setWishlist(prev => [...prev, data as WishlistRecord]);
    } else {
      setWishlist(prev => [...prev, { id: `local-${Date.now()}`, name: wishlistForm.name.trim(), price: Number(wishlistForm.price), image_url: wishlistForm.image_url.trim() || null, item_url: wishlistForm.item_url.trim() || null }]);
    }
    setWishlistForm({ name: "", price: "", image_url: "", item_url: "" }); setShowWishlistForm(false); notify("Product added to wishlist successfully.");
  };

  const searchAmazon = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase || amazonQuery.trim().length < 2) { notify("Enter at least two characters to search Amazon."); return; }
    setAmazonSearching(true); setAmazonResults([]);
    const { data, error } = await supabase.functions.invoke("amazon-search", { body: { query: amazonQuery.trim() } });
    setAmazonSearching(false);
    if (error) { notify(error.message || "Amazon search failed."); return; }
    if (data?.error) { notify(data.error); return; }
    setAmazonResults((data?.products || []) as AmazonSearchResult[]);
  };

  const addAmazonResult = async (product: AmazonSearchResult) => {
    const priceMatch = product.price.replace(/[^0-9.]/g, "").match(/\d+(?:\.\d+)?/);
    const price = priceMatch ? Number(priceMatch[0]) : 0;
    if (!profileId) { notify("Save your profile before adding wishlist items."); return; }
    if (supabase) {
      const productRecord = { creator_id: profileId, name: product.title, price, asin: product.asin, description: product.description, rating: product.rating, review_count: product.review_count, availability: product.availability, image_url: product.image_url, item_url: product.product_url };
      let result = await supabase.from("wishlist_items").insert(productRecord).select("id, name, price, asin, description, rating, review_count, availability, image_url, item_url").single();
      if (result.error?.message.includes("asin") || result.error?.message.includes("description")) {
        result = await supabase.from("wishlist_items").insert({ creator_id: profileId, name: product.title, price, image_url: product.image_url, item_url: product.product_url }).select("id, name, price, image_url, item_url").single();
      }
      const { data, error } = result;
      if (error) { notify(error.message); return; }
      setWishlist(prev => [...prev, data as WishlistRecord]);
    } else {
      setWishlist(prev => [...prev, { id: `local-${Date.now()}`, name: product.title, price, asin: product.asin, description: product.description, rating: product.rating, review_count: product.review_count, availability: product.availability, image_url: product.image_url, item_url: product.product_url }]);
    }
    setAmazonResults(prev => prev.filter(item => item.asin !== product.asin)); setSelectedProduct(null); notify("Product added to wishlist successfully.");
  };

  const addSpotifyRecommendation = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!spotifyForm.title.trim() || !spotifyForm.spotify_url.trim() || (supabase && !profileId)) return;
    if (supabase) {
      const { data, error } = await supabase.from("spotify_recommendations").insert({ profile_id: profileId, title: spotifyForm.title.trim(), detail: spotifyForm.detail.trim(), spotify_url: spotifyForm.spotify_url.trim(), sort_order: recommendations.length }).select("id, title, detail, spotify_url, cover_url").single();
      if (error) { notify(error.message); return; }
      setRecommendations(prev => [...prev, data as SpotifyRecord]);
    } else {
      setRecommendations(prev => [...prev, { id: `local-${Date.now()}`, title: spotifyForm.title.trim(), detail: spotifyForm.detail.trim(), spotify_url: spotifyForm.spotify_url.trim(), cover_url: null }]);
    }
    setSpotifyForm({ title: "", detail: "", spotify_url: "" }); setShowSpotifyForm(false); notify("Spotify recommendation added.");
  };

  const searchSpotify = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase || spotifyQuery.trim().length < 2) { notify("Enter at least two characters to search Spotify."); return; }
    setSpotifySearching(true); setSpotifyResults([]);
    const { data, error } = await supabase.functions.invoke("spotify-search", { body: { query: spotifyQuery.trim() } });
    setSpotifySearching(false);
    if (error) { notify(error.message || "Spotify search failed."); return; }
    if (data?.error) { notify(data.error); return; }
    setSpotifyResults((data?.results || []) as SpotifySearchResult[]);
  };

  const addSpotifyResult = async (result: SpotifySearchResult) => {
    if (!profileId) { notify("Save your profile before adding Spotify picks."); return; }
    const record = { profile_id: profileId, title: result.title, detail: result.detail, spotify_url: result.spotify_url, cover_url: result.cover_url, sort_order: recommendations.length };
    if (supabase) {
      const { data, error } = await supabase.from("spotify_recommendations").insert(record).select("id, title, detail, spotify_url, cover_url").single();
      if (error) { notify(error.message); return; }
      setRecommendations(prev => [...prev, data as SpotifyRecord]);
    } else {
      setRecommendations(prev => [...prev, { id: `local-${Date.now()}`, title: result.title, detail: result.detail, spotify_url: result.spotify_url, cover_url: result.cover_url }]);
    }
    setSpotifyResults(prev => prev.filter(item => item.id !== result.id)); notify("Spotify pick added.");
  };

  const connectWithCreator = async () => {
    if (!supabase || !profileId || isOwner) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { notify("Sign in to follow this creator."); return; }
    if (connected) {
      const { error } = await supabase.from("profile_follows").delete().eq("follower_id", user.id).eq("creator_id", profileId);
      if (error) { notify(error.message); return; }
      setConnected(false); setFollowerCount(count => Math.max(0, count - 1)); notify("Creator unfollowed.");
    } else {
      const { error } = await supabase.from("profile_follows").insert({ follower_id: user.id, creator_id: profileId });
      if (error) { notify(error.message); return; }
      setConnected(true); setFollowerCount(count => count + 1); notify("Now following this creator.");
    }
  };

  const toggleSpotify = async () => {
    const nextValue = !spotifyEnabled;
    setSpotifyEnabled(nextValue);
    if (!supabase || !profileId || !isOwner) return;
    const { error } = await supabase.from("profiles").update({ spotify_enabled: nextValue }).eq("id", profileId);
    if (error) { setSpotifyEnabled(!nextValue); notify(error.message); }
  };

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      if (!supabase) { setLoading(false); return; }
      const configuredSupabase = supabase;
      const profileQuery = configuredSupabase.from("profiles").select("id, role, display_name, username, bio, spotify_enabled").eq("role", view);
      const { data: { user } } = await configuredSupabase.auth.getUser();
      if (!creatorId && !user) { setLoading(false); return; }
      const { data: profile, error: profileError } = await (creatorId ? profileQuery.eq("id", creatorId) : profileQuery.eq("id", user?.id || "")).maybeSingle<ProfileRecord>();
      if (profileError) { setLoadError(profileError.message); setLoading(false); return; }
      if (!profile) { setLoading(false); return; }
      setProfileId(profile.id); setSpotifyEnabled(profile.spotify_enabled); setDetails({ name: profile.display_name, username: profile.username, bio: profile.bio }); setForm({ name: profile.display_name, username: profile.username, bio: profile.bio });
      if (view === "creator") {
        const { data, error: wishlistError } = await configuredSupabase.from("wishlist_items").select("id, name, price, asin, description, rating, review_count, availability, image_url, item_url").eq("creator_id", profile.id).order("created_at");
        if (wishlistError) setLoadError(wishlistError.message);
        setWishlist((data || []) as WishlistRecord[]);
        const [{ data: postData, error: postError }, { count: followers }] = await Promise.all([
          configuredSupabase.from("posts").select("id, body, image_url, created_at").eq("author_id", profile.id).order("created_at", { ascending: false }),
          configuredSupabase.from("profile_follows").select("follower_id", { count: "exact", head: true }).eq("creator_id", profile.id),
        ]);
        if (postError) setLoadError(postError.message);
        setPosts((postData || []) as PostRecord[]);
        setFollowerCount(followers || 0);
        const postIds = (postData || []).map(post => post.id);
        if (postIds.length) {
          const [{ data: likes }, { data: comments }] = await Promise.all([
            configuredSupabase.from("post_likes").select("post_id, user_id").in("post_id", postIds),
            configuredSupabase.from("post_comments").select("id, post_id, body, created_at, author:author_id(display_name)").in("post_id", postIds).order("created_at"),
          ]);
          setPostLikeCounts((likes || []).reduce<Record<string, number>>((counts, like) => { counts[like.post_id] = (counts[like.post_id] || 0) + 1; return counts; }, {}));
          if (user) setLikedPosts(new Set((likes || []).filter(like => like.user_id === user.id).map(like => like.post_id)));
          setPostComments((comments || []).reduce<Record<string, PostComment[]>>((grouped, comment) => { const author = Array.isArray(comment.author) ? comment.author[0] || null : comment.author; const normalized = { ...comment, author } as PostComment; const postComments = grouped[comment.post_id] || []; grouped[comment.post_id] = [...postComments, normalized]; return grouped; }, {}));
        }
        if (user && user.id !== profile.id) {
          const { data: follow } = await configuredSupabase.from("profile_follows").select("creator_id").eq("follower_id", user.id).eq("creator_id", profile.id).maybeSingle();
          setConnected(Boolean(follow));
        }
      } else {
        const { data } = await configuredSupabase.from("gift_history").select("id, gift_name, sent_at, creator:creator_id(display_name)").eq("supporter_id", profile.id).order("sent_at", { ascending: false });
        const normalizedGifts = (data || []).map(item => ({ ...item, creator: Array.isArray(item.creator) ? item.creator[0] || null : item.creator })) as unknown as GiftRecord[];
        setGifts(normalizedGifts);
        const { data: creator } = await configuredSupabase.from("profiles").select("id, display_name").eq("role", "creator").order("created_at").limit(1).maybeSingle<{ id: string; display_name: string }>();
        if (creator) {
          setCreatorName(creator.display_name);
          const { data: publicWishlist } = await configuredSupabase.from("wishlist_items").select("id, creator_id, name, price, asin, description, rating, review_count, availability, image_url, item_url").eq("creator_id", creator.id).order("created_at");
          setCreatorWishlist((publicWishlist || []) as WishlistRecord[]);
        }
      }
      const { data: spotifyData } = await configuredSupabase.from("spotify_recommendations").select("id, title, detail, spotify_url, cover_url").eq("profile_id", profile.id).order("sort_order");
      setRecommendations((spotifyData || []) as SpotifyRecord[]);
      setLoading(false);
    }
    void loadProfile();
  }, [creatorId, isCreator]);

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

  const createPost = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase || !profileId || !postBody.trim()) return;
    const { data, error } = await supabase.from("posts").insert({ author_id: profileId, body: postBody.trim() }).select("id, body, image_url, created_at").single();
    if (error) { notify(error.message); return; }
    setPosts(prev => [data as PostRecord, ...prev]);
    setPostBody(""); setShowPostForm(false); notify("Post published successfully.");
  };

  const togglePostLike = async (postId: string) => {
    if (!supabase || !profileId) { notify("Sign in to like posts."); return; }
    const alreadyLiked = likedPosts.has(postId);
    const result = alreadyLiked
      ? await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", profileId)
      : await supabase.from("post_likes").insert({ post_id: postId, user_id: profileId });
    if (result.error) { notify(result.error.message); return; }
    setLikedPosts(previous => { const next = new Set(previous); alreadyLiked ? next.delete(postId) : next.add(postId); return next; });
    setPostLikeCounts(previous => ({ ...previous, [postId]: Math.max(0, (previous[postId] || 0) + (alreadyLiked ? -1 : 1)) }));
  };

  const addPostComment = async (postId: string) => {
    const body = commentDrafts[postId]?.trim() || "";
    if (!supabase || !profileId) { notify("Sign in to comment on posts."); return; }
    if (!body) return;
    const { data, error } = await supabase.from("post_comments").insert({ post_id: postId, author_id: profileId, body }).select("id, post_id, body, created_at, author:author_id(display_name)").single();
    if (error) { notify(error.message); return; }
    const author = Array.isArray(data.author) ? data.author[0] || null : data.author;
    setPostComments(previous => ({ ...previous, [postId]: [...(previous[postId] || []), { ...data, author } as PostComment] }));
    setCommentDrafts(previous => ({ ...previous, [postId]: "" }));
    notify("Comment added.");
  };

  return (
    <div className="profile-page">
      <nav className="profile-nav">
        <button className="profile-logo" onClick={onBack}><span><SvgIcon name="bow" size={19} filled /></span> BakaBoost</button>
        <div className="profile-nav-links">
          <button onClick={onExploreGifts}>Explore gifts</button>
          <button className={!isCreator ? "active" : ""} onClick={() => onOpen("user")}>My profile</button>
          <button className={isCreator ? "active" : ""} onClick={() => onOpen("creator")}>Creator profile</button>
        </div>
        <div className="profile-nav-actions"><button className="profile-cart-link" onClick={onCart}><SvgIcon name="bag" size={14} /> Cart {cartCount > 0 && <b>{cartCount}</b>}</button><button className="profile-back" onClick={onSignOut}>Sign out</button></div>
      </nav>

      <main className="profile-shell">
        {loading && <div className="profile-loading">Loading your profile...</div>}
        {!loading && loadError && <div className="profile-empty-banner">Could not load this profile: {loadError}</div>}
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
        <div className="profile-social-stats" aria-label="Profile community stats">
          <div><strong>{followerCount}</strong><span>Followers</span></div>
          <div><strong>{Math.min(6, wishlist.length + gifts.length)}</strong><span>Badges</span></div>
          <div><strong>{isCreator ? wishlist.length : gifts.length}</strong><span>{isCreator ? "Wishlist items" : "Gifts sent"}</span></div>
        </div>
        <section className="profile-hero">
          <div className="profile-avatar">{details?.name?.charAt(0).toUpperCase() || "?"}</div>
          <div className="profile-heading">
            <span className="profile-kicker">{isCreator ? "Creator profile" : "Supporter profile"}</span>
            <h1>{details ? `${details.name}${isCreator ? "'s creator space." : "'s support space."}` : isCreator ? "Your creator space." : "Your support space."}</h1>
            <p>{details?.bio || (isCreator ? "Set up your profile to share your work and wishlist." : "Set up your profile to keep track of the creators and gifts that matter to you.")}</p>
            <div className="profile-meta"><span><SvgIcon name="heart" size={13} filled /> {isCreator ? `${wishlist.length} wishlist items` : `${gifts.length} gifts sent`}</span><span><SvgIcon name="gift" size={13} /> {isCreator ? "Wishlist" : "Supporter profile"}</span></div>
          </div>
          <div className="profile-hero-actions">{!isCreator && <button onClick={onExploreCreators} className="pink-btn profile-primary">Explore creators <span>→</span></button>}{isCreator && !isOwner && <button onClick={() => void connectWithCreator()} className="outline-action profile-connect">{connected ? "Following" : "Follow creator"}</button>}</div>
        </section>
        {isCreator && profileId && <CreatorStudio creatorId={profileId} isOwner={isOwner} />}

        <div className="profile-layout">
          <div className="profile-main-column">
            {isCreator ? (
              <section className="profile-section posts-section">
                <div className="profile-section-heading"><div><span className="section-label">From the community</span><h2>Posts</h2></div>{isOwner && <button className="outline-action" onClick={() => setShowPostForm(prev => !prev)}>{showPostForm ? "Close" : "Create a post"} <span>{showPostForm ? "×" : "+"}</span></button>}</div>
                {showPostForm && <form className="post-composer" onSubmit={createPost}><textarea value={postBody} onChange={event => setPostBody(event.target.value)} placeholder="Share something with your community..." rows={4} required /><button className="pink-btn" type="submit">Publish post</button></form>}
                <div className="posts-list">{posts.length ? posts.map(post => <article className="post-card" key={post.id}><div className="post-card-header"><div className="post-mini-avatar">{details?.name?.charAt(0).toUpperCase() || "?"}</div><div><strong>{details?.name || "Creator"}</strong><span>@{details?.username || "creator"} · {new Date(post.created_at).toLocaleDateString()}</span></div></div><p>{post.body}</p>{post.image_url && <img src={post.image_url} alt="" className="post-image" />}<div className="post-actions"><button onClick={() => void togglePostLike(post.id)}><SvgIcon name="heart" size={15} filled={likedPosts.has(post.id)} /> Like {postLikeCounts[post.id] || 0}</button><button onClick={() => setCommentingPost(commentingPost === post.id ? null : post.id)}>◯ Comment {postComments[post.id]?.length || 0}</button><button onClick={() => { void navigator.clipboard?.writeText(window.location.href); notify("Post link copied."); }}>↗ Share</button></div>{commentingPost === post.id && <div className="post-comment-box"><div className="post-comments">{(postComments[post.id] || []).map(comment => <p key={comment.id}><strong>{comment.author?.display_name || "Member"}</strong> {comment.body}</p>)}</div><form onSubmit={event => { event.preventDefault(); void addPostComment(post.id); }}><input value={commentDrafts[post.id] || ""} onChange={event => setCommentDrafts(previous => ({ ...previous, [post.id]: event.target.value }))} placeholder="Write a comment..." /><button className="outline-action" type="submit">Send</button></form></div>}</article>) : <div className="profile-empty-state">No posts yet. Published updates will appear here.</div>}</div>
              </section>
            ) : null}
            {isCreator ? (
              <section className="profile-section wishlist-section">
                <div className="profile-section-heading"><div><span className="section-label">A little something</span><h2>{isOwner ? "My wishlist" : `${details?.name || "Creator"}'s wishlist`}</h2></div></div>
                {amazonResults.length > 0 && <div className="amazon-results" aria-label="Amazon search results">{amazonResults.map(product => <article className="amazon-result" key={product.asin} onClick={() => setSelectedProduct(product)}>{product.image_url ? <img src={product.image_url} alt="" /> : <div className="amazon-result-placeholder"><SvgIcon name="gift" size={20} /></div>}<div><strong>{product.title}</strong><span>{product.price}</span></div><button className="outline-action" onClick={event => { event.stopPropagation(); void addAmazonResult(product); }}>Add</button></article>)}</div>}
                {canEdit && showWishlistForm && <form className="inline-form" onSubmit={addWishlistItem}><input value={wishlistForm.name} onChange={event => setWishlistForm({ ...wishlistForm, name: event.target.value })} placeholder="Gift name" required /><input type="number" min="0" step="0.01" value={wishlistForm.price} onChange={event => setWishlistForm({ ...wishlistForm, price: event.target.value })} placeholder="Price" required /><input value={wishlistForm.item_url} onChange={event => setWishlistForm({ ...wishlistForm, item_url: event.target.value })} placeholder="Amazon/product URL (optional)" type="url" /><input value={wishlistForm.image_url} onChange={event => setWishlistForm({ ...wishlistForm, image_url: event.target.value })} placeholder="Image URL (optional)" type="url" /><button className="pink-btn" type="submit">Add to wishlist</button></form>}
                {wishlist.length ? <div className="product-row-shell"><div className="wishlist-row">{wishlist.map(item => <article className="wishlist-item" key={item.id} onClick={() => setSelectedProduct(item)}><div className="wishlist-art">{item.image_url ? <img src={item.image_url} alt="" /> : <SvgIcon name="gift" size={33} />}</div><div><span className="product-brand">Wishlist pick</span><h3>{item.name}</h3><strong>{item.price ? `$${Number(item.price).toFixed(2)}` : "Price on Amazon"}</strong><button className="wishlist-link" onClick={event => { event.stopPropagation(); if (item.item_url) window.open(item.item_url, "_blank", "noopener,noreferrer"); }}>{isCreator ? "View item" : "Buy on Amazon"} <span>↗</span></button></div></article>)}</div><ProductRowControls target=".wishlist-section .wishlist-row" /></div> : <div className="profile-empty-state">No wishlist items yet. Add your first item from creator settings.</div>}
              </section>
            ) : (
              <section className="profile-section activity-section">
                <div className="profile-section-heading"><div><span className="section-label">Your little acts of kindness</span><h2>Gift activity</h2></div></div>
                {gifts.length ? gifts.map(item => <div className="activity-row" key={item.id}><div className="activity-icon"><SvgIcon name="gift" size={20} /></div><div><strong>{item.gift_name}</strong><span>Sent to {item.creator?.display_name || "a creator"}</span></div><time>{new Date(item.sent_at).toLocaleDateString()}</time></div>) : <div className="profile-empty-state">No gifts sent yet. Your gift history will appear here.</div>}
                {creatorWishlist.length > 0 && <div className="supporter-wishlist"><div className="profile-section-heading"><div><span className="section-label">Choose a thoughtful gift</span><h2>{creatorName}'s wishlist</h2></div></div><div className="wishlist-row">{creatorWishlist.map(item => <article className="wishlist-item" key={item.id} onClick={() => setSelectedProduct(item)}><div className="wishlist-art">{item.image_url ? <img src={item.image_url} alt="" /> : <SvgIcon name="gift" size={33} />}</div><div><h3>{item.name}</h3><span>{item.price ? `$${Number(item.price).toFixed(2)}` : "Price on Amazon"}</span><button className="wishlist-link" onClick={event => { event.stopPropagation(); if (item.item_url) window.open(item.item_url, "_blank", "noopener,noreferrer"); }}>Buy on Amazon <span>↗</span></button></div></article>)}</div></div>}
              </section>
            )}

            {details?.bio && <section className="profile-section notes-section"><span className="section-label">About {details.name}</span><blockquote>{details.bio}</blockquote></section>}
          </div>

          <aside className="profile-side-column">
            <section className="profile-section spotify-section">
              <div className="spotify-heading"><div className="spotify-mark">●</div><div><span className="section-label">Optional profile add-on</span><h2>Spotify picks</h2></div><div className="spotify-actions">{isOwner && <button className="outline-action" onClick={() => setShowSpotifyForm(prev => !prev)}>{showSpotifyForm ? "Close" : "Add pick"}</button>}{isOwner && <button className={`toggle ${spotifyEnabled ? "on" : ""}`} aria-label="Toggle Spotify recommendations" onClick={() => void toggleSpotify()}><span /></button>}</div></div>
              {showSpotifyForm && <form className="inline-form spotify-form" onSubmit={addSpotifyRecommendation}><input value={spotifyForm.title} onChange={event => setSpotifyForm({ ...spotifyForm, title: event.target.value })} placeholder="Song or playlist" required /><input value={spotifyForm.detail} onChange={event => setSpotifyForm({ ...spotifyForm, detail: event.target.value })} placeholder="Why you love it" /><input type="url" value={spotifyForm.spotify_url} onChange={event => setSpotifyForm({ ...spotifyForm, spotify_url: event.target.value })} placeholder="Spotify URL" required /><button className="pink-btn" type="submit">Save pick</button></form>}
              <form className="spotify-search-form" onSubmit={searchSpotify}><input value={spotifyQuery} onChange={event => setSpotifyQuery(event.target.value)} placeholder="Search Spotify songs or playlists" /><button className="outline-action" type="submit" disabled={spotifySearching}>{spotifySearching ? "Searching..." : "Search"}</button></form>
              {spotifyResults.length > 0 && <div className="spotify-search-results">{spotifyResults.map(result => <article className="spotify-search-result" key={result.id}><div className="spotify-result-cover">{result.cover_url ? <img src={result.cover_url} alt="" /> : <SvgIcon name="music" size={18} />}</div><div><strong>{result.title}</strong><span>{result.kind} · {result.detail}</span></div><button className="outline-action" onClick={() => void addSpotifyResult(result)}>Add</button></article>)}</div>}
              {spotifyEnabled ? recommendations.length ? <><p className="spotify-intro">{isCreator ? "What I listen to while I draw, stream, and dream up new things." : "A few songs that have been keeping me company lately."}</p><div className="playlist-list">{recommendations.map((playlist, index) => <div className="playlist-row" key={playlist.id}><span className="playlist-cover" style={{ background: "#f8d5df" }}>{index + 1}</span><span><strong>{playlist.title}</strong><small>{playlist.detail}</small></span><button onClick={() => window.open(playlist.spotify_url, "_blank", "noopener,noreferrer")} aria-label={`Open ${playlist.title}`}>▶</button></div>)}</div><div className="spotify-embeds">{recommendations.map(playlist => { const embedUrl = spotifyEmbedUrl(playlist.spotify_url); return embedUrl ? <iframe key={playlist.id} title={`Play ${playlist.title}`} src={embedUrl} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" /> : null; })}</div><a className="spotify-link" href="https://open.spotify.com" target="_blank" rel="noreferrer">Open Spotify <span>↗</span></a></> : <div className="spotify-off">No Spotify recommendations have been added yet.</div> : <div className="spotify-off">Spotify recommendations are hidden from your profile.</div>}
            </section>
            <section className="profile-section profile-stats"><div><strong>{isCreator ? wishlist.length : gifts.length}</strong><span>{isCreator ? "wishlist items" : "gifts sent"}</span></div><div><strong>{recommendations.length}</strong><span>Spotify picks</span></div></section>
          </aside>
        </div>
      </main>
      {selectedProduct && <div className="product-modal-backdrop" role="presentation" onClick={() => setSelectedProduct(null)}><section className="product-modal" role="dialog" aria-modal="true" aria-label="Product details" onClick={event => event.stopPropagation()}><button className="product-modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close product preview">×</button><div className="product-modal-image">{selectedProduct.image_url ? <img src={selectedProduct.image_url} alt="" /> : <SvgIcon name="gift" size={42} />}</div><div className="product-modal-copy"><span className="section-label">Amazon product preview</span><h2>{selectedProduct.name || (selectedProduct as AmazonSearchResult).title}</h2><div className="product-modal-price-row"><strong className="product-modal-price">{"price" in selectedProduct && selectedProduct.price ? typeof selectedProduct.price === "number" ? `$${selectedProduct.price.toFixed(2)}` : selectedProduct.price : "Price on Amazon"}</strong><span className="product-modal-source">Amazon listing</span></div><div className="product-modal-meta"><span><b>Rating</b>{selectedProduct.rating || "Not rated"}</span><span><b>Reviews</b>{selectedProduct.review_count || "No reviews yet"}</span><span><b>Availability</b>{selectedProduct.availability || "Check on Amazon"}</span></div><div className="product-modal-detail"><h3>About this product</h3><p>{selectedProduct.description || "Product details are available on the Amazon listing."}</p></div><div className="product-modal-actions">{canEdit && "title" in selectedProduct && <button className="pink-btn" onClick={() => void addAmazonResult(selectedProduct as AmazonSearchResult)}>Add to my wishlist <span>+</span></button>}{!isOwner && selectedProduct.item_url && <button className="pink-btn" onClick={() => onAddToCart({ id: (selectedProduct.id || ("asin" in selectedProduct ? selectedProduct.asin : "")) || "", name: selectedProduct.name || ("title" in selectedProduct ? selectedProduct.title : "Wishlist item"), price: selectedProduct.price ? `$${Number(selectedProduct.price).toFixed(2)}` : "Price on Amazon", img: selectedProduct.image_url, brand: "Amazon", item_url: selectedProduct.item_url, creator_id: profileId || undefined, creator_name: details?.name, wishlist_item_id: selectedProduct.id || ("id" in selectedProduct ? selectedProduct.id : "") })}>Add to bag <span>+</span></button>}{selectedProduct.item_url && <a className="outline-action" href={selectedProduct.item_url} target="_blank" rel="noreferrer">View on Amazon <span>↗</span></a>}</div><small className="product-modal-footnote">Price and availability can change on Amazon.</small></div></section></div>}
      {notice && <div className="site-toast profile-toast" role="status"><SvgIcon name="check" size={15} /> {notice}</div>}
    </div>
  );
}

export default function App() {
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "reset" | null>(() => window.location.hash.includes("recovery") ? "reset" : null);
  const [setupRole, setSetupRole] = useState<ProfileView | "choose" | null>(null);
  const [profileView, setProfileView] = useState<ProfileView | null>(null);
  const [creatorProfileId, setCreatorProfileId] = useState<string | undefined>();
  const [authChecking, setAuthChecking] = useState(true);
  const [liked, setLiked]     = useState<Set<number>>(new Set());
  const [email, setEmail]     = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [notice, setNotice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem("bakaboost-cart");
      return saved ? JSON.parse(saved) as CartItem[] : [];
    } catch {
      return [];
    }
  });
  const [utilityPage, setUtilityPage] = useState<UtilityPage>(() => window.location.hash === "#cart" ? "cart" : window.location.hash === "#blog" ? "blog" : window.location.hash === "#explore" ? "explore" : window.location.hash === "#creators" ? "creators" : window.location.hash === "#terms" ? "terms" : window.location.hash === "#privacy" ? "privacy" : null);

  useEffect(() => {
    const currentIndex = Number(window.history.state?.bakaboostIndex);
    const index = Number.isFinite(currentIndex) ? currentIndex : 0;
    window.history.replaceState({ ...(window.history.state || {}), bakaboostIndex: index }, "", window.location.href);
    sessionStorage.setItem("bakaboost-history-length", String(index + 1));
    window.dispatchEvent(new Event("bakaboost:navigation"));
  }, []);

  useEffect(() => {
    if (!supabase) { setAuthChecking(false); return; }
    const configuredSupabase = supabase;
    let mounted = true;
    const checkSession = async () => {
      const { data: { session } } = await configuredSupabase.auth.getSession();
      if (!mounted) return;
      setIsAuthenticated(Boolean(session));
      if (session && (!window.location.hash || window.location.hash === "#home")) {
        const { data: profile } = await configuredSupabase.from("profiles").select("role").eq("id", session.user.id).maybeSingle<{ role: ProfileView }>();
        if (mounted && profile?.role) setProfileView(profile.role);
      }
      setAuthChecking(false);
    };
    void checkSession();
    const { data: listener } = configuredSupabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(Boolean(session));
      if (event === "SIGNED_IN" && session?.user && !authMode && !profileView && !setupRole) setSetupRole("choose");
    });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("bakaboost-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const syncRoute = () => {
      const hash = window.location.hash;
      setUtilityPage(hash === "#cart" ? "cart" : hash === "#blog" ? "blog" : hash === "#explore" ? "explore" : hash === "#creators" ? "creators" : hash === "#terms" ? "terms" : hash === "#privacy" ? "privacy" : null);
      if (hash === "#creator-profile" || hash === "#user-profile") { setProfileView(hash === "#creator-profile" ? "creator" : "user"); setCreatorProfileId(undefined); }
      else if (hash.startsWith("#creator-") && hash !== "#creator-profile") { setProfileView("creator"); setCreatorProfileId(hash.slice("#creator-".length)); }
      else if (!hash.includes("profile")) { setProfileView(null); setCreatorProfileId(undefined); setSetupRole(null); }
    };
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => { window.removeEventListener("hashchange", syncRoute); window.removeEventListener("popstate", syncRoute); };
  }, []);

  useEffect(() => {
    document.title = utilityPage === "cart" ? "Your Gift Bag | BakaBoost" : utilityPage === "blog" ? "Journal | BakaBoost" : utilityPage === "explore" ? "Explore Gifts | BakaBoost" : utilityPage === "creators" ? "Find Creators | BakaBoost" : utilityPage === "terms" ? "Terms of Service | BakaBoost" : utilityPage === "privacy" ? "Privacy Policy | BakaBoost" : "BakaBoost";
  }, [utilityPage]);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const subscribeNewsletter = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) { notify("Enter a valid email to subscribe."); return; }
    if (!supabase) { notify("Newsletter signup is unavailable right now."); return; }
    const { error } = await supabase.from("newsletter_subscriptions").upsert({ email: normalizedEmail }, { onConflict: "email" });
    if (error) { notify(error.message); return; }
    setSubscribed(true); notify("You are on the list.");
  };

  const addToCart = (gift: typeof GIFTS[number]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.gift.id === gift.id);
      if (existing) return prev.map(item => item.gift.id === gift.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { gift, quantity: 1 }];
    });
    notify(`${gift.name} added to your bag.`);
  };

  const addProductToCart = (product: CartProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.gift.id === product.id);
      if (existing) return prev.map(item => item.gift.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { gift: product, quantity: 1 }];
    });
    notify(`${product.name} added to your bag.`);
  };

  const addAmazonToCreatorWishlist = async (product: AmazonSearchResult) => {
    if (!supabase) { notify("Wishlist saving is unavailable right now."); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { notify("Sign in as a creator to add wishlist products."); return; }
    const { data: profile } = await supabase.from("profiles").select("id, role").eq("id", user.id).maybeSingle<{ id: string; role: ProfileView }>();
    if (!profile || profile.role !== "creator") { notify("Only creator profiles can add wishlist products."); return; }
    const priceMatch = product.price.replace(/[^0-9.]/g, "").match(/\d+(?:\.\d+)?/);
    const { error } = await supabase.from("wishlist_items").insert({ creator_id: profile.id, name: product.title, price: priceMatch ? Number(priceMatch[0]) : 0, asin: product.asin, description: product.description, rating: product.rating, review_count: product.review_count, availability: product.availability, image_url: product.image_url, item_url: product.product_url });
    if (error) { notify(error.message); return; }
    notify("Product added to your creator wishlist.");
  };

  const preparePurchase = async (items: CartItem[]) => {
    if (!supabase) return false;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { notify("Sign in before reviewing a purchase."); return false; }
    const intents = items.flatMap(item => {
      const product = item.gift;
      return "creator_id" in product && product.creator_id && product.item_url ? [{ supporter_id: user.id, creator_id: product.creator_id, wishlist_item_id: product.wishlist_item_id || null, product_url: product.item_url }] : [];
    });
    if (!intents.length) return true;
    const { error } = await supabase.from("gift_intents").insert(intents);
    if (error) { notify(error.message); return false; }
    return true;
  };

  const updateCart = (id: string | number, delta: number) => setCartItems(prev => prev.flatMap(item => item.gift.id === id ? [{ ...item, quantity: item.quantity + delta }].filter(next => next.quantity > 0) : [item]));
  const navigateUtility = (page: UtilityPage) => {
    const hash = page ? `#${page}` : "#home";
    const currentIndex = Number(window.history.state?.bakaboostIndex || 0);
    const nextIndex = currentIndex + 1;
    window.history.pushState({ bakaboostIndex: nextIndex }, "", hash);
    sessionStorage.setItem("bakaboost-history-length", String(nextIndex + 1));
    window.dispatchEvent(new Event("bakaboost:navigation"));
    setProfileView(null);
    setSetupRole(null);
    setCreatorProfileId(undefined);
    setUtilityPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const pushAppRoute = (hash: string) => { const currentIndex = Number(window.history.state?.bakaboostIndex || 0); const nextIndex = currentIndex + 1; window.history.pushState({ bakaboostIndex: nextIndex }, "", hash); sessionStorage.setItem("bakaboost-history-length", String(nextIndex + 1)); window.dispatchEvent(new Event("bakaboost:navigation")); };
  const openProfile = (view: ProfileView) => { setUtilityPage(null); setSetupRole(null); setCreatorProfileId(undefined); setProfileView(view); pushAppRoute(`#${view}-profile`); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openCreator = (id: string) => { setUtilityPage(null); setSetupRole(null); setProfileView("creator"); setCreatorProfileId(id); pushAppRoute(`#creator-${id}`); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const signOut = async () => { if (supabase) await supabase.auth.signOut(); setIsAuthenticated(false); setProfileView(null); setSetupRole(null); navigateUtility(null); };
  const toggleLike = (id:number) => {
    setLiked(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });
  };
  const openHowItWorks = () => {
    if (utilityPage !== null || profileView || setupRole) {
      navigateUtility(null);
      window.setTimeout(() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" }), 0);
      return;
    }
    document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };
  const appNavigation = <AppNavigation onHome={() => navigateUtility(null)} onExplore={() => navigateUtility("explore")} onCreators={() => navigateUtility("creators")} onHowItWorks={openHowItWorks} onCart={() => navigateUtility("cart")} onProfile={() => openProfile("user")} authenticated={isAuthenticated} cartCount={cartCount} onAuth={() => setAuthMode("signin")} />;

  if (authChecking) return <div className="app-loading">Loading BakaBoost...</div>;

  const browserControls = <BrowserNavigation />;

  if (authMode) {
    return <AuthPage mode={authMode} onBack={() => setAuthMode(null)} onSwitch={() => setAuthMode(authMode === "signin" ? "signup" : "signin")} onReset={() => setAuthMode("signin")} onAuthenticated={() => { setAuthMode(null); setSetupRole(authMode === "reset" ? null : "choose"); }} />;
  }
  if (setupRole) {
    if (setupRole === "choose") return <RoleSetup onChoose={setSetupRole} />;
    return <><ProfilePage view={setupRole} onBack={() => navigateUtility(null)} onOpen={openProfile} onExploreGifts={() => navigateUtility("explore")} onExploreCreators={() => navigateUtility("creators")} onCart={() => navigateUtility("cart")} onAddToCart={addProductToCart} cartCount={cartCount} onSignOut={signOut} />{browserControls}</>;
  }
  if (profileView) {
    return <><ProfilePage view={profileView} creatorId={creatorProfileId} onBack={() => navigateUtility("creators")} onOpen={openProfile} onExploreGifts={() => navigateUtility("explore")} onExploreCreators={() => navigateUtility("creators")} onCart={() => navigateUtility("cart")} onAddToCart={addProductToCart} cartCount={cartCount} onSignOut={signOut} />{browserControls}</>;
  }
  if (utilityPage === "cart") {
    return <>{appNavigation}<CartPage items={cartItems} onBack={() => navigateUtility(null)} onUpdate={updateCart} onRemove={id => setCartItems(prev => prev.filter(item => item.gift.id !== id))} onCheckout={() => notify("Gift intent saved. Complete purchase on Amazon.")} onPreparePurchase={preparePurchase} />{browserControls}</>;
  }
  if (utilityPage === "blog") {
    return <>{appNavigation}<BlogPage onBack={() => navigateUtility(null)} />{browserControls}</>;
  }
  if (utilityPage === "terms" || utilityPage === "privacy") {
    return <>{appNavigation}<LegalPage kind={utilityPage} onBack={() => navigateUtility(null)} />{browserControls}</>;
  }
  if (utilityPage === "explore") {
    return <>{appNavigation}<ExplorePage liked={liked} cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} onToggleLike={toggleLike} onAddToCart={addToCart} onAddAmazonToWishlist={product => void addAmazonToCreatorWishlist(product)} onOpenCart={() => navigateUtility("cart")} onBack={() => navigateUtility(null)} />{browserControls}</>;
  }
  if (utilityPage === "creators") {
    return <>{appNavigation}<CreatorDirectoryPage onBack={() => navigateUtility(null)} onView={openCreator} />{browserControls}</>;
  }
  return (
    <div style={{ fontFamily:"'Josefin Sans',sans-serif", background:C.bg, color:C.text, minHeight:"100vh" }}>
      {browserControls}

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
                fontSize:13, fontFamily:"'Josefin Sans',sans-serif", color:C.text, outline:"none",
              }}
            />
          </div>

          {/* Links */}
          <div className="nav-links" style={{ display:"flex", gap:26, alignItems:"center", marginLeft:"auto" }}>
              {['Explore gifts','For creators','How it works','Blog'].map(l=>(
                <a key={l} href={l === "Explore gifts" ? "#explore" : l === "For creators" ? "#creators" : l === "How it works" ? "#how-it-works" : "#blog"} className="nav-link" onClick={(event) => { if (l === "Explore gifts") { event.preventDefault(); navigateUtility("explore"); } else if (l === "For creators") { event.preventDefault(); navigateUtility("creators"); } else if (l === "How it works") { event.preventDefault(); document.querySelector('#how-it-works')?.scrollIntoView({ behavior:"smooth", block:"start" }); } else if (l === "Blog") { event.preventDefault(); navigateUtility("blog"); } }}>{l}</a>
            ))}
          </div>

          {/* Auth */}
          <div className="nav-actions" style={{ display:"flex", gap:10, alignItems:"center", flexShrink:0, marginLeft:8 }}>
            <button onClick={() => isAuthenticated ? openProfile("user") : setAuthMode("signin")} style={{ background:"none", border:"none", cursor:"pointer", fontWeight:800, fontSize:12, color:"#222" }}>{isAuthenticated ? "My profile" : "Log in"}</button>
            {!isAuthenticated && <button onClick={() => setAuthMode("signup")} className="pink-btn" style={{ padding:"8px 18px", fontSize:12 }}>Sign up</button>}
            <button aria-label={`Open your bag${cartItems.length ? ` (${cartItems.length} items)` : ""}`} onClick={() => navigateUtility("cart")} style={{ width:32, height:32, borderRadius:"50%", background:"#fff", border:"1px solid #e8e5e7", display:"flex", alignItems:"center", justifyContent:"center", color:"#444", cursor:"pointer", position:"relative" }}><SvgIcon name="bag" size={16} />{cartItems.length > 0 && <span className="bag-count">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>}</button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero-section" style={{
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
      <section id="how-it-works" className="how-section" aria-labelledby="how-it-works-title">
        <div className="how-shell">
          <div className="how-heading">
            <span className="how-kicker"><SvgIcon name="heart" size={12} filled /> For creators, by fans</span>
            <h2 id="how-it-works-title">How it works <span aria-hidden="true">✦</span></h2>
          </div>
          <img src={howItWorksBg} alt="How BakaBoost works" className="how-background-image" />
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
            <a className="explore-gifts" href="#explore" onClick={(event) => { event.preventDefault(); navigateUtility("explore"); }} style={{ fontSize:12, fontWeight:800, color:C.pink, textDecoration:"none", border:`1px solid ${C.border}`, borderRadius:999, padding:"8px 14px" }}>Explore all gifts →</a>
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
                    <button aria-label={`Add ${g.name} to your bag`} onClick={() => addToCart(g)} className="add-circle">+</button>
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
          <div className="collection-heading">
            <div>
              <span className="section-label">A little something to collect</span>
              <h2>Your Community Collection <span aria-hidden="true">✦</span></h2>
              <p>Every kind act leaves a little sparkle behind.</p>
            </div>
            <div className="collection-count" aria-label="4 of 6 badges unlocked"><strong>4/6</strong><span>unlocked</span></div>
          </div>

          <div className="collection-progress" role="progressbar" aria-label="Community badge progress" aria-valuemin={0} aria-valuemax={6} aria-valuenow={4}>
            <span style={{ width:"66.67%" }} />
          </div>

          <div className="collection-layout">
            <div className="badge-grid">
              {BADGES.map((b, index) => (
                <div key={b.name} className={`badge-box ${b.unlocked ? "is-unlocked" : "is-locked"}`} tabIndex={0}>
                  <div className="badge-frame"><SvgIcon name={b.icon as IconName} size={27} /></div>
                  <div className="badge-copy"><strong className="badge-name">{b.name}</strong><span>{b.desc}</span></div>
                  <span className="badge-status">{b.unlocked ? "Unlocked" : index === 4 ? "3/5" : "2/5"}</span>
                </div>
              ))}
            </div>

            <aside className="next-badge" aria-label="Next badge: Top Gifter">
              <div className="next-badge-top"><span>Next badge</span><SvgIcon name="trophy" size={15} /></div>
              <div className="next-badge-frame"><SvgIcon name="trophy" size={31} /></div>
              <strong>Top Gifter</strong>
              <p>Send two more gifts to unlock this one.</p>
              <div className="next-badge-progress"><span style={{ width:"60%" }} /></div>
              <span className="next-badge-meta">3 of 5 gifts</span>
            </aside>
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
                    fontSize:14, fontFamily:"'Josefin Sans',sans-serif",
                    outline:"none", width:230, color:C.pinkDark,
                    background:"#ffffff",
                  }}
                />
                <button
                  className="pink-btn"
                  style={{ padding:"10px 22px", fontSize:13, background:C.pink, color:"#fff" }}
                  onClick={() => void subscribeNewsletter()}
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
                      <a href={l === "Blog" ? "#blog" : l === "Privacy" ? "#privacy" : l === "Terms" ? "#terms" : "#"} onClick={(event) => { event.preventDefault(); if (l === "Blog") navigateUtility("blog"); else if (l === "Privacy") navigateUtility("privacy"); else if (l === "Terms") navigateUtility("terms"); else notify(`${l} is coming soon.`); }}
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
