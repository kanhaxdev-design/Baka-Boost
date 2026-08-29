/**
 * Neumorphism Theme System
 * Soft, subtle 3D shadows and lighting effects
 * Creates depth through light and shadow rather than sharp borders
 */

export const neumoStyles = {
  // Soft elevated surfaces with subtle shadows
  elevated: {
    boxShadow: '0 2px 8px rgba(32, 37, 31, 0.08), 0 8px 16px rgba(32, 37, 31, 0.04)',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  },
  
  // Stronger elevation for hover states
  elevatedHover: {
    boxShadow: '0 4px 12px rgba(32, 37, 31, 0.12), 0 12px 24px rgba(32, 37, 31, 0.08)',
    transform: 'translateY(-2px)',
  },

  // Inset shadow for pressed/depressed state
  inset: {
    boxShadow: 'inset 0 2px 4px rgba(32, 37, 31, 0.06)',
  },

  // Soft glow for active elements
  glow: {
    boxShadow: '0 0 16px rgba(217, 93, 57, 0.2), 0 2px 8px rgba(32, 37, 31, 0.08)',
  },

  // Large elevation for modals/overlays
  elevation3: {
    boxShadow: '0 8px 24px rgba(32, 37, 31, 0.15), 0 16px 32px rgba(32, 37, 31, 0.1)',
  },

  // Subtle background depth
  subtleDepth: {
    boxShadow: '0 1px 3px rgba(32, 37, 31, 0.05)',
  },
};

export const neuroCSS = `
  /* ─── NEUMORPHISM BASE ─── */
  .neuro-elevated {
    box-shadow: 0 2px 8px rgba(32, 37, 31, 0.08), 0 8px 16px rgba(32, 37, 31, 0.04);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .neuro-elevated:hover {
    box-shadow: 0 4px 12px rgba(32, 37, 31, 0.12), 0 12px 24px rgba(32, 37, 31, 0.08);
    transform: translateY(-2px);
  }

  .neuro-inset {
    box-shadow: inset 0 2px 4px rgba(32, 37, 31, 0.06);
  }

  .neuro-glow {
    box-shadow: 0 0 16px rgba(217, 93, 57, 0.2), 0 2px 8px rgba(32, 37, 31, 0.08);
  }

  .neuro-depth-3 {
    box-shadow: 0 8px 24px rgba(32, 37, 31, 0.15), 0 16px 32px rgba(32, 37, 31, 0.1);
  }

  .neuro-subtle {
    box-shadow: 0 1px 3px rgba(32, 37, 31, 0.05);
  }

  /* Apply neumorphism to cards */
  .product-card.neuro-card,
  .pick-card.neuro-card,
  .card-pink.neuro-card,
  .explore-product.neuro-card {
    background: linear-gradient(135deg, #FFFDF8 0%, #F4F0E8 100%);
    border: 1px solid rgba(32, 37, 31, 0.04);
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(32, 37, 31, 0.08), 
                0 8px 16px rgba(32, 37, 31, 0.04);
    backdrop-filter: blur(4px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .product-card.neuro-card:hover,
  .pick-card.neuro-card:hover,
  .card-pink.neuro-card:hover,
  .explore-product.neuro-card:hover {
    box-shadow: 0 4px 12px rgba(32, 37, 31, 0.12), 
                0 12px 24px rgba(32, 37, 31, 0.08),
                0 0 24px rgba(217, 93, 57, 0.15);
    transform: translateY(-4px);
    background: linear-gradient(135deg, #FFFDF8 0%, #F9F6F0 100%);
  }

  /* Neumorphic buttons */
  .neuro-btn {
    background: linear-gradient(135deg, #FFFDF8 0%, #F4F0E8 100%);
    border: 1px solid rgba(32, 37, 31, 0.06);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(32, 37, 31, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    color: #20251F;
    font-weight: 600;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .neuro-btn:hover {
    box-shadow: 0 4px 12px rgba(32, 37, 31, 0.12), 
                0 0 16px rgba(217, 93, 57, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.6);
    transform: translateY(-1px);
  }

  .neuro-btn:active {
    box-shadow: inset 0 2px 4px rgba(32, 37, 31, 0.1), 
                inset 0 1px 0 rgba(255, 255, 255, 0.5);
    transform: translateY(0);
  }

  /* Neumorphic input fields */
  .neuro-input {
    background: linear-gradient(135deg, #FFFDF8 0%, #F4F0E8 100%);
    border: 1px solid rgba(32, 37, 31, 0.06);
    border-radius: 12px;
    box-shadow: inset 0 2px 4px rgba(32, 37, 31, 0.04);
    padding: 10px 14px;
    color: #20251F;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  .neuro-input:focus {
    outline: none;
    box-shadow: inset 0 2px 4px rgba(32, 37, 31, 0.04),
                0 0 12px rgba(217, 93, 57, 0.2);
    border-color: rgba(217, 93, 57, 0.3);
  }

  /* Neumorphic badges */
  .neuro-badge {
    background: linear-gradient(135deg, rgba(255, 253, 248, 0.8) 0%, rgba(244, 240, 232, 0.8) 100%);
    border: 1px solid rgba(32, 37, 31, 0.08);
    border-radius: 20px;
    box-shadow: 0 1px 4px rgba(32, 37, 31, 0.06);
    padding: 6px 12px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #20251F;
    display: inline-block;
  }

  /* Neumorphic section headers */
  .neuro-section {
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(32, 37, 31, 0.08), 0 8px 16px rgba(32, 37, 31, 0.04);
    padding: 24px;
    background: linear-gradient(135deg, #FFFDF8 0%, #F4F0E8 100%);
    border: 1px solid rgba(32, 37, 31, 0.04);
  }

  @media (prefers-reduced-motion: reduce) {
    .neuro-elevated,
    .neuro-btn,
    .neuro-input,
    .product-card.neuro-card,
    .pick-card.neuro-card {
      transition: none;
      transform: none;
    }
  }
`;

export default neuroCSS;
