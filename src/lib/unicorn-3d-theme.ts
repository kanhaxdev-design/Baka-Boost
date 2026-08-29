/**
 * Unicorn 3D Theme System
 * Iridescent, magical aesthetic with 3D transforms and glowing effects
 * Inspired by unicorn studio effects with dreamy, gradient-based colors
 */

export const unicornColors = {
  // Iridescent color palette
  pink: '#FF69B4',
  lavender: '#B19CD9',
  cyan: '#40E0D0',
  magenta: '#FF1493',
  periwinkle: '#CCCCFF',
  mint: '#7FFFD4',
  coral: '#FF7F50',
  orchid: '#DA70D6',
};

export const unicornStyles = {
  // Iridescent text gradient
  iridescent: {
    background: 'linear-gradient(90deg, #FF69B4, #B19CD9, #40E0D0, #FF7F50)',
    backgroundSize: '300% 300%',
    animation: 'iridescentShift 8s ease infinite',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  // 3D perspective hover
  perspective3D: {
    perspective: '1200px',
    transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
  },

  // Glowing aura effect
  glow: {
    boxShadow: `
      0 0 20px rgba(255, 105, 180, 0.4),
      0 0 40px rgba(177, 156, 217, 0.3),
      0 0 60px rgba(64, 224, 208, 0.2)
    `,
  },
};

export const unicornCSS = `
  /* ─── UNICORN 3D THEME ─── */

  /* Iridescent gradient animation */
  @keyframes iridescentShift {
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

  @keyframes unicornFloat {
    0%, 100% {
      transform: translateY(0px) rotateZ(0deg);
    }
    25% {
      transform: translateY(-8px) rotateZ(1deg);
    }
    75% {
      transform: translateY(-8px) rotateZ(-1deg);
    }
  }

  @keyframes unicornGlow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(255, 105, 180, 0.4),
                  0 0 40px rgba(177, 156, 217, 0.3),
                  0 0 60px rgba(64, 224, 208, 0.2);
    }
    50% {
      box-shadow: 0 0 30px rgba(255, 105, 180, 0.6),
                  0 0 60px rgba(177, 156, 217, 0.4),
                  0 0 90px rgba(64, 224, 208, 0.3);
    }
  }

  @keyframes unicornRotate {
    0% {
      transform: rotateX(0deg) rotateY(0deg);
    }
    100% {
      transform: rotateX(360deg) rotateY(360deg);
    }
  }

  @keyframes rainbowShift {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }

  /* Iridescent text effect */
  .unicorn-text {
    background: linear-gradient(90deg, #FF69B4, #B19CD9, #40E0D0, #FF7F50, #FF69B4);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: iridescentShift 8s ease infinite;
    font-weight: 700;
  }

  /* Unicorn cards with 3D hover */
  .product-card.unicorn,
  .pick-card.unicorn,
  .explore-product.unicorn {
    background: linear-gradient(135deg, rgba(255, 253, 248, 0.8), rgba(244, 240, 232, 0.8));
    border: 1px solid rgba(255, 105, 180, 0.2);
    border-radius: 16px;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    perspective: 1200px;
    box-shadow: 0 0 20px rgba(255, 105, 180, 0.15),
                0 2px 8px rgba(32, 37, 31, 0.08);
  }

  .product-card.unicorn:hover,
  .pick-card.unicorn:hover,
  .explore-product.unicorn:hover {
    transform: translateY(-8px) rotateX(8deg) rotateY(2deg);
    box-shadow: 0 0 40px rgba(255, 105, 180, 0.3),
                0 0 60px rgba(177, 156, 217, 0.2),
                0 8px 24px rgba(32, 37, 31, 0.15);
    border-color: rgba(177, 156, 217, 0.3);
    background: linear-gradient(135deg, rgba(255, 253, 248, 0.95), rgba(244, 240, 232, 0.9));
  }

  /* Unicorn floating effect */
  .unicorn-float {
    animation: unicornFloat 4s ease-in-out infinite;
  }

  /* Unicorn glow effect */
  .unicorn-glow {
    animation: unicornGlow 3s ease-in-out infinite;
  }

  /* Unicorn spinning effect */
  .unicorn-spin {
    animation: unicornRotate 8s linear infinite;
  }

  /* Unicorn rainbow effect */
  .unicorn-rainbow {
    animation: rainbowShift 6s linear infinite;
  }

  /* Unicorn buttons */
  .unicorn-btn {
    background: linear-gradient(135deg, #FF69B4, #B19CD9, #40E0D0);
    background-size: 300% 300%;
    color: white;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(255, 105, 180, 0.3),
                0 4px 12px rgba(177, 156, 217, 0.2);
    transition: all 0.3s ease;
    animation: iridescentShift 6s ease infinite;
  }

  .unicorn-btn:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 0 30px rgba(255, 105, 180, 0.5),
                0 0 60px rgba(177, 156, 217, 0.3),
                0 8px 20px rgba(32, 37, 31, 0.15);
  }

  .unicorn-btn:active {
    transform: translateY(0) scale(0.98);
  }

  /* Unicorn sections */
  .unicorn-section {
    background: linear-gradient(135deg,
      rgba(255, 105, 180, 0.05) 0%,
      rgba(177, 156, 217, 0.05) 50%,
      rgba(64, 224, 208, 0.05) 100%
    );
    border: 1px solid rgba(255, 105, 180, 0.15);
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 0 24px rgba(255, 105, 180, 0.1),
                0 2px 12px rgba(32, 37, 31, 0.06);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  /* Unicorn badges with shimmer */
  .unicorn-badge {
    background: linear-gradient(90deg, rgba(255, 105, 180, 0.2), rgba(177, 156, 217, 0.2), rgba(64, 224, 208, 0.2));
    border: 1px solid rgba(255, 105, 180, 0.3);
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 0.875rem;
    font-weight: 700;
    color: #20251F;
    display: inline-block;
    box-shadow: 0 0 12px rgba(255, 105, 180, 0.2);
    background-size: 200% 200%;
    animation: iridescentShift 8s ease infinite;
  }

  /* Unicorn heading with glow */
  .unicorn-heading {
    background: linear-gradient(90deg, #FF69B4, #B19CD9, #40E0D0, #FF7F50);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: iridescentShift 8s ease infinite;
    filter: drop-shadow(0 0 8px rgba(255, 105, 180, 0.3));
  }

  /* Unicorn borders with gradient */
  .unicorn-border {
    border-image: linear-gradient(90deg, #FF69B4, #B19CD9, #40E0D0, #FF7F50, #FF69B4) 1;
    border: 1px solid;
    border-radius: 12px;
    background-clip: padding-box;
  }

  /* Unicorn 3D card grid */
  .unicorn-grid {
    display: grid;
    gap: 24px;
    perspective: 1200px;
  }

  .unicorn-grid > * {
    transform-style: preserve-3d;
  }

  /* Unicorn enhanced hover for nested elements */
  .unicorn-card-image {
    border-radius: 12px;
    overflow: hidden;
    transform-style: preserve-3d;
    transition: transform 0.4s ease;
  }

  .unicorn:hover .unicorn-card-image {
    transform: scale(1.05) rotateZ(2deg);
  }

  /* Particle-like effect around unicorn elements */
  .unicorn-particles::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    background: radial-gradient(circle at 30% 30%, rgba(255, 105, 180, 0.1), transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(64, 224, 208, 0.1), transparent 50%);
    pointer-events: none;
    animation: unicornGlow 3s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .unicorn-text,
    .unicorn-float,
    .unicorn-glow,
    .unicorn-spin,
    .unicorn-rainbow,
    .unicorn-btn,
    .unicorn-badge,
    .unicorn-heading,
    .product-card.unicorn,
    .pick-card.unicorn,
    .explore-product.unicorn {
      animation: none;
      transform: none;
      transition: none;
    }

    .product-card.unicorn:hover,
    .pick-card.unicorn:hover,
    .explore-product.unicorn:hover {
      transform: translateY(-4px);
    }
  }

  @supports not (backdrop-filter: blur(8px)) {
    .unicorn-section {
      background: linear-gradient(135deg,
        rgba(255, 105, 180, 0.1) 0%,
        rgba(177, 156, 217, 0.1) 50%,
        rgba(64, 224, 208, 0.1) 100%
      );
    }
  }
`;

export default unicornCSS;
