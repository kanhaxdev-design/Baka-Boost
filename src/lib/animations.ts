/**
 * Animation utilities for premium Apple-style effects
 */

export const ANIMATION_PRESETS = {
  // Entrance animations
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  // Hover effects
  scaleHover: {
    whileHover: { scale: 1.02, transition: { duration: 0.3 } },
  },
  floatHover: {
    whileHover: { y: -4, transition: { duration: 0.3 } },
  },
  // 3D effects
  perspective3D: {
    whileHover: {
      rotateY: 2,
      rotateX: -2,
      transition: { duration: 0.4 },
    },
  },
} as const;

// Easing functions matching Apple's motion design
export const EASING = {
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  gentle: [0.25, 0.46, 0.45, 0.94],
  smooth: [0.34, 1.56, 0.64, 1],
} as const;

// Stagger children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Scroll-triggered animations
export interface ScrollTriggerOptions {
  threshold?: number;
  rootMargin?: string;
}

export const defaultScrollOptions: ScrollTriggerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

// 3D transform utilities
export const transform3D = {
  card: "perspective(1200px) rotateX(0deg) rotateY(0deg)",
  hover: "perspective(1200px) rotateX(-2deg) rotateY(2deg) translateZ(10px)",
};

// Animation class names for CSS transitions
export const ANIMATION_CLASSES = {
  enter: "animate-fade-in-up",
  exit: "animate-fade-out-down",
  hover: "hover:animate-scale-105",
  scroll: "scroll-smooth",
} as const;
