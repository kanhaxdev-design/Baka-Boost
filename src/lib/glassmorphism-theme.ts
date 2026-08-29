/**
 * Glassmorphism Theme System
 * Frosted glass effects with backdrop blur and transparency
 * Creates layered depth through semi-transparent surfaces and blur
 */

export const glassStyles = {
  // Soft glass with light blur
  softGlass: {
    background: 'rgba(244, 240, 232, 0.6)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
  },

  // Medium glass with stronger blur
  glass: {
    background: 'rgba(244, 240, 232, 0.5)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },

  // Dark glass for overlays
  darkGlass: {
    background: 'rgba(32, 37, 31, 0.4)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },

  // Accent glass with color tint
  accentGlass: {
    background: 'rgba(217, 93, 57, 0.1)',
    backdropFilter: 'blur(14px)',
    border: '1px solid rgba(217, 93, 57, 0.25)',
  },
};

export const glassCSS = `
  /* ─── GLASSMORPHISM BASE ─── */
  .glass-soft {
    background: rgba(244, 240, 232, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    transition: all 0.3s ease;
  }

  .glass {
    background: rgba(244, 240, 232, 0.5);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }

  .glass-dark {
    background: rgba(32, 37, 31, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .glass-accent {
    background: rgba(217, 93, 57, 0.1);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(217, 93, 57, 0.25);
    box-shadow: 0 0 24px rgba(217, 93, 57, 0.15);
  }

  /* Glass cards with neumorphism */
  .product-card.glass-card,
  .pick-card.glass-card,
  .explore-product.glass-card {
    background: rgba(244, 240, 232, 0.5);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(32, 37, 31, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .product-card.glass-card:hover,
  .pick-card.glass-card:hover,
  .explore-product.glass-card:hover {
    background: rgba(244, 240, 232, 0.65);
    box-shadow: 0 4px 16px rgba(32, 37, 31, 0.1),
                0 0 24px rgba(217, 93, 57, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.5);
    transform: translateY(-4px);
    backdrop-filter: blur(20px);
  }

  /* Glass buttons */
  .glass-btn {
    background: rgba(244, 240, 232, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 12px;
    color: #20251F;
    font-weight: 600;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(32, 37, 31, 0.06);
  }

  .glass-btn:hover {
    background: rgba(244, 240, 232, 0.6);
    box-shadow: 0 4px 12px rgba(32, 37, 31, 0.1),
                0 0 16px rgba(217, 93, 57, 0.2);
    transform: translateY(-2px);
    backdrop-filter: blur(16px);
  }

  .glass-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(32, 37, 31, 0.08);
  }

  /* Glass input fields */
  .glass-input {
    background: rgba(244, 240, 232, 0.3);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 10px 14px;
    color: #20251F;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  .glass-input::placeholder {
    color: rgba(32, 37, 31, 0.4);
  }

  .glass-input:focus {
    outline: none;
    background: rgba(244, 240, 232, 0.5);
    border-color: rgba(217, 93, 57, 0.3);
    box-shadow: 0 0 12px rgba(217, 93, 57, 0.2);
    backdrop-filter: blur(12px);
  }

  /* Glass sections */
  .glass-section {
    background: rgba(244, 240, 232, 0.45);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(32, 37, 31, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }

  /* Glass modals/overlays */
  .glass-modal {
    background: rgba(32, 37, 31, 0.2);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  /* Glass navbar */
  .glass-nav {
    background: rgba(255, 253, 248, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 8px rgba(32, 37, 31, 0.04);
  }

  /* Glass badge */
  .glass-badge {
    background: rgba(244, 240, 232, 0.4);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 20px;
    padding: 6px 12px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #20251F;
    display: inline-block;
  }

  @media (prefers-reduced-motion: reduce) {
    .glass-soft,
    .glass,
    .glass-dark,
    .glass-accent,
    .product-card.glass-card,
    .glass-btn,
    .glass-input {
      transition: none;
      transform: none;
    }
  }

  @supports not (backdrop-filter: blur(12px)) {
    .glass-soft,
    .glass,
    .glass-accent,
    .product-card.glass-card,
    .glass-section,
    .glass-nav {
      background: rgba(244, 240, 232, 0.8);
      border: 1px solid rgba(32, 37, 31, 0.1);
    }
  }
`;

export default glassCSS;
