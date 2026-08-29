/**
 * Custom hooks for scroll and animation effects
 */

import { useEffect, useRef, useState, useCallback } from "react";
import type { ScrollTriggerOptions } from "./animations";
import { defaultScrollOptions } from "./animations";

/**
 * Hook to detect if element is in viewport
 */
export function useInView(options: ScrollTriggerOptions = defaultScrollOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Stop observing after first trigger for entrance animations
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

/**
 * Hook for smooth scroll behavior
 */
export function useSmoothScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback(
    (direction: "left" | "right", distance = 300) => {
      if (!containerRef.current) return;

      const scrollAmount = direction === "left" ? -distance : distance;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    },
    []
  );

  return { containerRef, scroll };
}

/**
 * Hook for parallax scroll effect
 */
export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementOffset = rect.top - window.innerHeight / 2;
      setOffset(elementOffset * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return {
    ref,
    style: {
      transform: `translateY(${offset}px)`,
    },
  };
}

/**
 * Hook for scroll progress tracking
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

/**
 * Hook to apply fade-in animation on scroll
 */
export function useFadeInOnScroll(options?: ScrollTriggerOptions) {
  const { ref, isInView } = useInView(options);

  return {
    ref,
    className: isInView ? "animate-fade-in-up" : "opacity-0",
    style: {
      transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      transform: isInView ? "translateY(0)" : "translateY(20px)",
      opacity: isInView ? 1 : 0,
    },
  };
}

/**
 * Hook for staggered child animations
 */
export function useStaggerAnimation(itemCount: number, delay = 0.1) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedIndices, setAnimatedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const children = containerRef.current?.children;
    if (!children) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger animate children
          const newIndices = new Set<number>();
          Array.from(children).forEach((_, index) => {
            setTimeout(() => {
              newIndices.add(index);
              setAnimatedIndices(new Set(newIndices));
            }, index * delay * 1000);
          });

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [delay, itemCount]);

  const getItemStyle = (index: number) => ({
    transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * delay}s`,
    opacity: animatedIndices.has(index) ? 1 : 0,
    transform: animatedIndices.has(index)
      ? "translateY(0) scale(1)"
      : "translateY(20px) scale(0.95)",
  });

  return { containerRef, getItemStyle };
}

/**
 * Hook for mouse move 3D effect
 */
export function use3DMouseMove() {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const x = (e.clientY - rect.top - centerY) / 20;
      const y = (e.clientX - rect.left - centerX) / 20;

      setRotation({ x, y });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
  }, []);

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  };
}

/**
 * Hook for scroll-linked animations
 */
export function useScrollLinkedAnimation(elementRef: React.RefObject<HTMLElement>) {
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    if (!elementRef.current) return;

    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;

      const distance = Math.abs(elementCenter - windowCenter);
      const maxDistance = window.innerHeight / 2 + rect.height / 2;
      const amount = 1 - Math.min(distance / maxDistance, 1);

      setScrollAmount(amount);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef]);

  return scrollAmount;
}
