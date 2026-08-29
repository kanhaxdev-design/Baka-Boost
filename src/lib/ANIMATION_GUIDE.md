/**
 * Animation Implementation Guide
 * 
 * This guide explains how to use the premium animations and smooth scroll effects
 * throughout your BakaBoost website.
 */

// ─────────────────────────────────────────────────────────────────────
// 1. USING THE SCROLL ANIMATION PROVIDER
// ─────────────────────────────────────────────────────────────────────
//
// Wrap your entire app with ScrollAnimationProvider to enable:
// - Global smooth scrolling
// - Scroll-triggered animations
// - Parallax effects
//
// In main.tsx or your root component:
//
// import { ScrollAnimationProvider } from "@/lib/scroll-animation-provider";
//
// <ScrollAnimationProvider>
//   <App />
// </ScrollAnimationProvider>

// ─────────────────────────────────────────────────────────────────────
// 2. SCROLL-TRIGGERED ANIMATIONS (via data attributes)
// ─────────────────────────────────────────────────────────────────────
//
// Add data-scroll-animate to any element to trigger animations on scroll:
//
// <section data-scroll-animate="fade-up">
//   This fades and slides up when it enters the viewport
// </section>
//
// Available animations:
// - data-scroll-animate="fade-up"    → Fades in while sliding up
// - data-scroll-animate="fade-down"  → Fades in while sliding down
// - data-scroll-animate="fade-left"  → Fades in while sliding from left
// - data-scroll-animate="fade-right" → Fades in while sliding from right
// - data-scroll-animate="scale"      → Scales up while fading in
//
// Add data-animate-once to stop observing after first animation:
// <div data-scroll-animate="fade-up" data-animate-once></div>

// ─────────────────────────────────────────────────────────────────────
// 3. PARALLAX EFFECTS
// ─────────────────────────────────────────────────────────────────────
//
// Add data-parallax="speed" for parallax scrolling (0-1):
//
// <img data-parallax="0.3" src="background.jpg" />
// <!-- Moves slower than scroll (0.3x speed) -->
//
// <img data-parallax="0.7" src="element.jpg" />
// <!-- Moves almost at scroll speed (0.7x) -->

// ─────────────────────────────────────────────────────────────────────
// 4. REACT HOOKS FOR ANIMATIONS
// ─────────────────────────────────────────────────────────────────────

// useInView: Detect when element enters viewport
// import { useInView } from "@/lib/scroll-hooks";
//
// const { ref, isInView } = useInView();
// <div ref={ref} className={isInView ? "animate-fade-in-up" : "opacity-0"}>
//   Content
// </div>

// useSmoothScroll: Smooth horizontal scrolling
// import { useSmoothScroll } from "@/lib/scroll-hooks";
//
// const { containerRef, scroll } = useSmoothScroll();
// <div ref={containerRef} className="flex overflow-x-auto">
//   {items.map(item => <Item key={item.id} />)}
// </div>
// <button onClick={() => scroll("right", 300)}>Next</button>

// useParallax: Parallax scrolling effect
// import { useParallax } from "@/lib/scroll-hooks";
//
// const { ref, style } = useParallax(0.5);
// <img ref={ref} style={style} src="image.jpg" />

// useScrollProgress: Track scroll position
// import { useScrollProgress } from "@/lib/scroll-hooks";
//
// const progress = useScrollProgress();
// <div style={{ width: progress + "%" }}>Progress Bar</div>

// useFadeInOnScroll: Fade-in animation on scroll
// import { useFadeInOnScroll } from "@/lib/scroll-hooks";
//
// const { ref, style } = useFadeInOnScroll();
// <section ref={ref} style={style}>Content</section>

// useStaggerAnimation: Staggered children animations
// import { useStaggerAnimation } from "@/lib/scroll-hooks";
//
// const { containerRef, getItemStyle } = useStaggerAnimation(items.length);
// <div ref={containerRef}>
//   {items.map((item, index) => (
//     <div key={item.id} style={getItemStyle(index)}>
//       {item.name}
//     </div>
//   ))}
// </div>

// use3DMouseMove: 3D perspective on mouse move
// import { use3DMouseMove } from "@/lib/scroll-hooks";
//
// const { ref, onMouseMove, onMouseLeave, style } = use3DMouseMove();
// <div 
//   ref={ref} 
//   style={style} 
//   onMouseMove={onMouseMove} 
//   onMouseLeave={onMouseLeave}
// >
//   Hover for 3D effect
// </div>

// ─────────────────────────────────────────────────────────────────────
// 5. CSS ANIMATION CLASSES
// ─────────────────────────────────────────────────────────────────────
//
// Direct CSS classes for instant animations:
//
// Entrance Animations:
// .animate-fade-in-up      → Fade in + slide up
// .animate-fade-in-down    → Fade in + slide down
// .animate-fade-in-left    → Fade in + slide left
// .animate-fade-in-right   → Fade in + slide right
// .animate-scale-in        → Fade in + scale up
// .animate-blur-in         → Fade in with blur effect
// .animate-bounce          → Bouncing animation
// .animate-pulse           → Pulsing opacity
// .animate-shimmer         → Shimmer loading effect
//
// Stagger Delays:
// .animate-delay-100       → 0.1s delay
// .animate-delay-200       → 0.2s delay
// .animate-delay-300       → 0.3s delay
// .animate-delay-400       → 0.4s delay
// .animate-delay-500       → 0.5s delay
//
// Hover Effects:
// .hover-elevate           → Lifts on hover
// .animate-scale-105:hover → Scales 105% on hover
//
// Example:
// <div className="animate-fade-in-up animate-delay-200">
//   Content
// </div>

// ─────────────────────────────────────────────────────────────────────
// 6. SMOOTH SCROLL BEHAVIOR
// ─────────────────────────────────────────────────────────────────────
//
// Smooth scrolling is enabled globally via ScrollAnimationProvider.
// For manual smooth scroll:
//
// element.scrollBy({ top: 300, behavior: "smooth" });
// element.scrollIntoView({ behavior: "smooth", block: "center" });

// ─────────────────────────────────────────────────────────────────────
// 7. CUSTOM ANIMATION TIMING FUNCTIONS
// ─────────────────────────────────────────────────────────────────────
//
// Available via CSS custom properties:
// --apple-ease-out        : cubic-bezier(0.16, 1, 0.3, 1)
// --apple-ease-in-out     : cubic-bezier(0.4, 0, 0.2, 1)
// --apple-gentle          : cubic-bezier(0.25, 0.46, 0.45, 0.94)
//
// Usage in custom styles:
// transition: transform 0.3s var(--apple-ease-out);

// ─────────────────────────────────────────────────────────────────────
// 8. COMPONENT ANIMATION PATTERNS
// ─────────────────────────────────────────────────────────────────────

// Pattern 1: Page Entry Animation
// <div className="page-enter">
//   Animates in when page loads
// </div>

// Pattern 2: Staggered List Items
// <ul>
//   {items.map((item, idx) => (
//     <li 
//       key={item.id}
//       className="animate-fade-in-up"
//       style={{ animationDelay: `${idx * 100}ms` }}
//     >
//       {item.name}
//     </li>
//   ))}
// </ul>

// Pattern 3: Card Grid with Hover
// <div className="grid gap-4">
//   {cards.map(card => (
//     <div key={card.id} className="product-card hover-elevate">
//       {card.content}
//     </div>
//   ))}
// </div>

// Pattern 4: Hero Section with Parallax
// <section className="hero">
//   <img data-parallax="0.4" src="bg.jpg" />
//   <h1 className="animate-fade-in-up">Welcome</h1>
//   <p className="animate-fade-in-up animate-delay-200">Subtitle</p>
// </section>

// ─────────────────────────────────────────────────────────────────────
// 9. PERFORMANCE OPTIMIZATION
// ─────────────────────────────────────────────────────────────────────
//
// - Animations use will-change for optimization
// - Passive scroll listeners for better performance
// - IntersectionObserver for efficient viewport detection
// - CSS animations instead of JS where possible
// - Hardware acceleration via transform and opacity

// ─────────────────────────────────────────────────────────────────────
// 10. EXAMPLES IN YOUR COMPONENTS
// ─────────────────────────────────────────────────────────────────────

// Example: Hero Section
// <section data-scroll-animate="fade-up" data-animate-once>
//   <h1 className="animate-fade-in-down">BakaBoost</h1>
//   <p className="animate-fade-in-down animate-delay-200">
//     Support creators you love
//   </p>
//   <button className="pink-btn hover-elevate">Get Started</button>
// </section>

// Example: Product Grid
// <div className="grid grid-cols-4 gap-4">
//   {products.map((product, idx) => (
//     <div 
//       key={product.id} 
//       data-scroll-animate="scale"
//       className="product-card"
//       style={{ animationDelay: `${idx * 50}ms` }}
//     >
//       <img src={product.image} />
//       <h3>{product.name}</h3>
//     </div>
//   ))}
// </div>

// Example: With Intersection Observer Hook
// function Features() {
//   const { ref, isInView } = useInView({ threshold: 0.2 });
//   
//   return (
//     <section ref={ref}>
//       {isInView && (
//         <div className="grid">
//           {features.map((f, i) => (
//             <div 
//               key={f.id} 
//               className="animate-fade-in-up"
//               style={{ animationDelay: `${i * 100}ms` }}
//             >
//               {f.title}
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

export const animationImplementationGuide = "See comments in this file for comprehensive animation usage guide";
