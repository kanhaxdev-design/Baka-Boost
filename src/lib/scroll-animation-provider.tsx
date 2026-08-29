/**
 * Scroll Animation Provider
 * Handles scroll-linked animations and smooth scroll effects throughout the app
 */

import { useEffect } from "react";

export function ScrollAnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Enable smooth scrolling globally
    document.documentElement.style.scrollBehavior = "smooth";

    // Setup intersection observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation classes when element enters viewport
          entry.target.classList.add("scroll-animate-in");
          
          // Optional: stop observing after animation is triggered
          if (entry.target.hasAttribute("data-animate-once")) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe all elements with data-scroll-animate attribute
    const scrollAnimatedElements = document.querySelectorAll("[data-scroll-animate]");
    scrollAnimatedElements.forEach((element) => observer.observe(element));

    // Setup parallax effect for elements with data-parallax attribute
    const handleParallax = () => {
      const parallaxElements = document.querySelectorAll("[data-parallax]");
      parallaxElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const speed = parseFloat(htmlElement.dataset.parallax || "0.5");
        const rect = element.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementOffset = rect.top + scrolled;
        const yPos = (scrolled - (elementOffset - window.innerHeight / 2)) * speed;

        if (htmlElement.style.transform) {
          htmlElement.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleParallax, { passive: true });

    // Setup scroll progress indicator
    const handleScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      // Dispatch custom event for scroll progress
      window.dispatchEvent(
        new CustomEvent("scroll-progress", { detail: { progress: scrollPercent } })
      );
    };

    window.addEventListener("scroll", handleScrollProgress, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleParallax);
      window.removeEventListener("scroll", handleScrollProgress);
    };
  }, []);

  return <>{children}</>;
}

// Scroll animation CSS classes that will be applied dynamically
export const scrollAnimationStyles = `
  [data-scroll-animate] {
    will-change: transform, opacity;
  }

  [data-scroll-animate="fade-up"] {
    opacity: 0;
    transform: translateY(30px);
  }

  [data-scroll-animate="fade-up"].scroll-animate-in {
    animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  [data-scroll-animate="fade-down"] {
    opacity: 0;
    transform: translateY(-30px);
  }

  [data-scroll-animate="fade-down"].scroll-animate-in {
    animation: fadeInDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  [data-scroll-animate="fade-left"] {
    opacity: 0;
    transform: translateX(-30px);
  }

  [data-scroll-animate="fade-left"].scroll-animate-in {
    animation: fadeInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  [data-scroll-animate="fade-right"] {
    opacity: 0;
    transform: translateX(30px);
  }

  [data-scroll-animate="fade-right"].scroll-animate-in {
    animation: fadeInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  [data-scroll-animate="scale"] {
    opacity: 0;
    transform: scale(0.95);
  }

  [data-scroll-animate="scale"].scroll-animate-in {
    animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;
