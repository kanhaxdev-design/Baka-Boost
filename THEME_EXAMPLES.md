# Theme Implementation Examples

Quick copy-paste examples for common components using the three design themes.

## Product Cards

### Luxury Card (All Three Themes Combined)
```jsx
<div className="product-card neuro-card glass-card unicorn">
  <div className="product-image">
    <img src="product.jpg" alt="Product" />
  </div>
  <div className="product-details">
    <h3>Premium Product</h3>
    <p className="price">$99.99</p>
    <button className="unicorn-btn">Shop Now</button>
  </div>
</div>
```

### Minimalist Card (Neumorphism Only)
```jsx
<div className="product-card neuro-card">
  <img src="product.jpg" alt="Product" />
  <h3>Product Name</h3>
  <button className="pink-btn">View Details</button>
</div>
```

### Modern Card (Glass + Unicorn)
```jsx
<div className="product-card glass-card unicorn">
  <img src="product.jpg" alt="Product" />
  <h3 className="unicorn-text">Magical Product</h3>
  <button className="unicorn-btn">Add to Cart</button>
</div>
```

## Buttons

### Iridescent CTA Button
```jsx
<button className="pink-btn unicorn-btn">
  Join BakaBoost →
</button>
```

### Glass Effect Button
```jsx
<button className="glass-btn">
  Explore More
</button>
```

### Neumorphic Soft Button
```jsx
<button className="neuro-btn">
  Learn More
</button>
```

## Sections

### Hero Section (Premium Look)
```jsx
<section className="hero-section unicorn-section glass-soft">
  <h1 className="unicorn-text">Your Magical Headline</h1>
  <p>Supporting description text</p>
  <button className="unicorn-btn">Get Started →</button>
</section>
```

### Feature Section (Educational)
```jsx
<section className="feature-section glass-section unicorn-section">
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
    <div className="neuro-card">
      <h3>Feature 1</h3>
      <p>Description</p>
    </div>
    <div className="neuro-card">
      <h3>Feature 2</h3>
      <p>Description</p>
    </div>
    <div className="neuro-card">
      <h3>Feature 3</h3>
      <p>Description</p>
    </div>
  </div>
</section>
```

### Showcase Section (Magical)
```jsx
<section className="unicorn-section glass-soft unicorn-float">
  <h2 className="unicorn-heading">Our Premium Collection</h2>
  <div className="unicorn-grid">
    {items.map(item => (
      <div key={item.id} className="product-card unicorn">
        <img src={item.image} alt={item.name} />
        <h3>{item.name}</h3>
        <p className="unicorn-badge">{item.badge}</p>
      </div>
    ))}
  </div>
</section>
```

## Badges & Labels

### Premium Badge
```jsx
<span className="unicorn-badge unicorn-glow">
  ✨ Premium
</span>
```

### Soft Badge (Neumorphism)
```jsx
<span className="neuro-badge">
  New
</span>
```

### Glass Badge
```jsx
<span className="glass-badge">
  Featured
</span>
```

## Text Effects

### Iridescent Heading
```jsx
<h1 className="unicorn-heading">
  Welcome to the Magic
</h1>
```

### Gradient Text
```jsx
<h2 className="unicorn-text">
  Animated Gradient Text
</h2>
```

### Color Shift Text
```jsx
<h1 className="color-shift-text unicorn-text">
  Double Effect Text
</h1>
```

## Input Fields

### Glass Input
```jsx
<input 
  type="text" 
  className="glass-input" 
  placeholder="Search..."
/>
```

### Neumorphic Input
```jsx
<input 
  type="email" 
  className="neuro-input" 
  placeholder="your@email.com"
/>
```

## Navigation

### Glass Navbar
```jsx
<nav className="glass-nav">
  <div className="nav-brand">BakaBoost</div>
  <div className="nav-links">
    <a href="#home">Home</a>
    <a href="#products">Products</a>
    <a href="#creators">Creators</a>
  </div>
</nav>
```

## Animation Combinations

### Floating Glow Card
```jsx
<div className="product-card unicorn glass-card unicorn-float unicorn-glow">
  {/* Content */}
</div>
```

### Spinning Magical Element
```jsx
<div className="unicorn-badge unicorn-spin">
  ⭐ Special Offer
</div>
```

### Pulsing Glow Badge
```jsx
<span className="unicorn-badge unicorn-glow">
  Live Now
</span>
```

## Complete Page Example

```jsx
function LandingPage() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section unicorn-section glass-soft">
        <div className="hero-content">
          <h1 className="unicorn-text">
            Welcome to BakaBoost
          </h1>
          <p>Your platform for supporting creators</p>
          <button className="pink-btn unicorn-btn">
            Join Now →
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="feature-section glass-section unicorn-section">
        <h2 className="unicorn-heading">Why Choose Us?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[
            { icon: '🎯', title: 'Targeted', desc: 'Support your favorites' },
            { icon: '🔒', title: 'Secure', desc: '100% safe & private' },
            { icon: '🎨', title: 'Creative', desc: 'Unique gift options' },
            { icon: '💝', title: 'Meaningful', desc: 'Real impact' },
          ].map(feature => (
            <div key={feature.title} className="neuro-card">
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="gifts-section glass-section">
        <h2 className="unicorn-heading">Popular Gifts</h2>
        <div className="unicorn-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px' }}>
          {products.map(product => (
            <div key={product.id} className="product-card neuro-card glass-card unicorn">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <button className="unicorn-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* CREATORS SECTION */}
      <section className="creator-section unicorn-section unicorn-float">
        <h2 className="unicorn-heading">Featured Creators</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          {creators.map(creator => (
            <div key={creator.id} className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
              <img 
                src={creator.avatar} 
                alt={creator.name}
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%',
                  marginBottom: '16px'
                }}
              />
              <h3>{creator.name}</h3>
              <p className="unicorn-badge unicorn-glow">
                {creator.followers} followers
              </p>
              <button className="glass-btn" style={{ width: '100%' }}>
                Follow
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section unicorn-section glass-soft">
        <h2 className="unicorn-heading">Ready to Get Started?</h2>
        <p>Join thousands of creators and supporters today</p>
        <button className="pink-btn unicorn-btn" style={{ padding: '14px 32px', fontSize: '16px' }}>
          Create Your Account →
        </button>
      </section>
    </div>
  );
}
```

## Responsive Adjustments

### Mobile-First Approach
```jsx
<div 
  className="product-card glass-card unicorn"
  style={{
    // Desktop: full effects
    '@media (max-width: 768px)': {
      // Mobile: slightly reduced animation
    }
  }}
>
  {/* Content */}
</div>
```

### Reduce Effects on Slower Devices
```jsx
// For users with prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  .unicorn-text,
  .unicorn-float,
  .unicorn-glow,
  .unicorn-btn {
    animation: none;
    transition: none;
  }
}
```

## Testing Themes

### Quick Theme Toggle (Dev Testing)
```javascript
// In browser console:
document.documentElement.classList.toggle('no-animations')
// Then add to CSS:
// .no-animations * { animation: none !important; }
```

### Check Glassmorphism Support
```javascript
CSS.supports('backdrop-filter', 'blur(1px)') 
  ? console.log('Glassmorphism supported')
  : console.log('Will use fallback')
```

### Inspect 3D Transforms
```javascript
// Check transform applied
document.querySelector('.product-card.unicorn').style.transform
```

## Best Practices

1. **Combine Strategically**: Don't use all three themes on every element
2. **Hero Sections**: Use `unicorn-section` + `glass-soft` for impact
3. **Cards**: Use combination of `neuro-card`, `glass-card`, `unicorn`
4. **Buttons**: CTA buttons: `unicorn-btn`, standard: `neuro-btn`
5. **Navigation**: Use `glass-nav` for modern look
6. **Badges**: `unicorn-badge` for special, `neuro-badge` for regular
7. **Text**: Use `unicorn-text` for headings, `color-shift-text` for accents

## Performance Notes

- Glassmorphism: ~2-3% GPU impact
- Unicorn animations: ~1-2% GPU impact per element
- Neumorphism: Negligible impact (pure shadow/border)
- Mobile: Reduce blur amount or use `glass-soft` instead of `glass`

---

**Pro Tip**: Test all combinations on your target devices before deploying. The iridescent effects work best on high-end displays but are still beautiful on mobile with proper fallbacks.
