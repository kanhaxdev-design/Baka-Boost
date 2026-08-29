/**
 * Gradient Animation Utilities
 * Premium gradient effects that match BakaBoost's color palette
 */

// Gradient presets matching BakaBoost theme
export const GRADIENT_PRESETS = {
  // Main brand gradients
  brand: "linear-gradient(135deg, #ff4d8d 0%, #ff79a8 50%, #c2195b 100%)",
  brandSoft: "linear-gradient(135deg, #fff0f6 0%, #ffddeb 50%, #ffe8f3 100%)",
  brandDark: "linear-gradient(135deg, #c2195b 0%, #8f2454 50%, #5a1735 100%)",

  // Directional gradients
  toRight: "linear-gradient(90deg, rgba(255, 77, 141, 0.8), rgba(255, 121, 168, 0.4))",
  toLeft: "linear-gradient(270deg, rgba(255, 77, 141, 0.8), rgba(255, 121, 168, 0.4))",
  toBottom: "linear-gradient(180deg, rgba(255, 77, 141, 0.8), rgba(255, 121, 168, 0.4))",
  toTop: "linear-gradient(0deg, rgba(255, 77, 141, 0.8), rgba(255, 121, 168, 0.4))",

  // Radial gradients
  radialPink: "radial-gradient(circle, rgba(255, 77, 141, 0.8), rgba(194, 25, 91, 0.2))",
  radialSoft: "radial-gradient(circle, rgba(255, 200, 220, 0.6), rgba(255, 230, 240, 0.2))",

  // Multi-color blends
  sunset:
    "linear-gradient(135deg, #ff4d8d 0%, #ff79a8 25%, #ffb3d0 50%, #ffd6e8 75%, #fff0f6 100%)",
  twilight:
    "linear-gradient(135deg, #5a1735 0%, #8f2454 25%, #c2195b 50%, #ff4d8d 75%, #ff79a8 100%)",

  // Text gradients (for titles)
  textGradient: "linear-gradient(90deg, #c2195b, #ff4d8d, #ff79a8)",
  textGradientReverse: "linear-gradient(90deg, #ff79a8, #ff4d8d, #c2195b)",
} as const;

// Animation keyframes with gradients
export const gradientAnimations = `
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes gradientPulse {
    0%, 100% {
      opacity: 0.6;
      filter: brightness(1);
    }
    50% {
      opacity: 1;
      filter: brightness(1.1);
    }
  }

  @keyframes gradientRotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes gradientWave {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes colorShift {
    0% {
      background: linear-gradient(135deg, #ff4d8d, #ff79a8);
    }
    50% {
      background: linear-gradient(135deg, #ff79a8, #ffc0d9);
    }
    100% {
      background: linear-gradient(135deg, #ffc0d9, #ff4d8d);
    }
  }

  @keyframes meshGradient {
    0%, 100% {
      background-position: 0% 0%, 100% 0%, 50% 100%, 50% 50%;
    }
    25% {
      background-position: 20% 20%, 80% 20%, 70% 80%, 30% 50%;
    }
    50% {
      background-position: 100% 100%, 0% 100%, 50% 0%, 50% 50%;
    }
    75% {
      background-position: 50% 80%, 50% 20%, 30% 20%, 70% 50%;
    }
  }

  .gradient-shift {
    background-size: 200% 200%;
    animation: gradientShift 8s ease-in-out infinite;
  }

  .gradient-pulse {
    animation: gradientPulse 3s ease-in-out infinite;
  }

  .gradient-rotate {
    animation: gradientRotate 12s linear infinite;
  }

  .gradient-wave {
    background-size: 200% 200%;
    animation: gradientWave 6s ease-in-out infinite;
  }

  .gradient-mesh {
    background-size: 150% 150%;
    animation: meshGradient 15s ease-in-out infinite;
  }

  .color-shift-text {
    background: linear-gradient(90deg, #c2195b, #ff4d8d, #ff79a8, #c2195b);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 6s linear infinite;
  }

  /* Gradient mesh background with multiple layers */
  .gradient-mesh-bg {
    background: 
      radial-gradient(at 20% 50%, rgba(255, 77, 141, 0.3) 0px, transparent 50px),
      radial-gradient(at 60% 0%, rgba(255, 121, 168, 0.3) 0px, transparent 50px),
      radial-gradient(at 60% 100%, rgba(255, 200, 220, 0.2) 0px, transparent 50px),
      radial-gradient(at 0% 100%, rgba(230, 150, 180, 0.2) 0px, transparent 50px),
      linear-gradient(135deg, rgba(247, 234, 240, 1) 0%, rgba(255, 240, 245, 1) 100%);
    background-size: 200% 200%;
    animation: meshGradient 15s ease-in-out infinite;
  }

  /* Glowing gradient border effect */
  .gradient-border {
    position: relative;
    background-color: white;
    border: 2px solid;
    border-image: linear-gradient(90deg, #ff4d8d, #ff79a8, #ffc0d9) 1;
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: linear-gradient(90deg, #ff4d8d, #ff79a8, #ffc0d9);
    opacity: 0;
    animation: gradientPulse 3s ease-in-out infinite;
    z-index: -1;
  }

  /* Gradient text shadow (glow effect) */
  .gradient-glow {
    text-shadow:
      0 0 20px rgba(255, 77, 141, 0.6),
      0 0 40px rgba(255, 121, 168, 0.4),
      0 0 60px rgba(194, 25, 91, 0.2);
  }

  /* Animated gradient background for sections */
  .gradient-section {
    background: linear-gradient(135deg, #fff0f6, #ffe8f3, #fff5f8);
    background-size: 300% 300%;
    animation: gradientShift 12s ease-in-out infinite;
  }

  /* Glass morphism with gradient */
  .gradient-glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 77, 141, 0.2);
    box-shadow: 
      0 8px 32px rgba(255, 77, 141, 0.1),
      inset 0 1px 2px rgba(255, 255, 255, 0.8);
  }

  /* Gradient underline effect */
  .gradient-underline {
    position: relative;
    display: inline-block;
  }

  .gradient-underline::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff4d8d, #ff79a8);
    animation: slideRight 0.6s ease-out forwards;
  }

  @keyframes slideRight {
    to {
      width: 100%;
    }
  }
`;

// CSS class utilities
export const gradientClasses = {
  shiftingBg: "gradient-shift",
  pulsingGradient: "gradient-pulse",
  rotatingGradient: "gradient-rotate",
  wavingGradient: "gradient-wave",
  textGradient: "color-shift-text",
  meshBackground: "gradient-mesh-bg",
  glassEffect: "gradient-glass",
  glowText: "gradient-glow",
  sectionBg: "gradient-section",
} as const;
