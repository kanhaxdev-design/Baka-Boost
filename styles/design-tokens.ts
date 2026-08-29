import type { CSSProperties } from "react";

/**
 * BakaBoost design system foundation.
 *
 * The palette is intentionally editorial: warm paper, ink, mineral green,
 * and a restrained vermilion accent feel like a photographed creator shelf
 * or zine rather than a conventional storefront.
 */

export const colors = {
  /** Base surface: warm paper keeps the canvas tactile and editorial. */
  surface: "#F4F0E8",
  /** Card surface: quiet near-white gives product imagery a clean mount. */
  card: "#FFFDF8",
  /** Ink: softened charcoal preserves high contrast without looking digital-black. */
  ink: "#20251F",
  /** Primary accent: vermilion behaves like a printed editorial mark. */
  accent: "#D95D39",
  /** Secondary accent: mineral green adds creator-made, collected character. */
  secondary: "#5A7D73",
  /** Utility: muted umber is reserved for prices, metadata, and tags. */
  utility: "#A47B52",
} as const;

export const fonts = {
  display: {
    family: "Fraunces",
    googleImport: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap",
    weight: { medium: 500, semibold: 600, bold: 700 },
  },
  body: {
    family: "DM Sans",
    googleImport: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap",
    weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  utility: {
    family: "IBM Plex Mono",
    googleImport: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap",
    weight: { regular: 400, medium: 500, semibold: 600 },
  },
} as const;

export const typeScale = {
  h1: { size: "clamp(2.75rem, 7vw, 6rem)", lineHeight: 0.94, weight: 600, family: fonts.display.family },
  h2: { size: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1, weight: 600, family: fonts.display.family },
  h3: { size: "1.75rem", lineHeight: 1.08, weight: 600, family: fonts.display.family },
  h4: { size: "1.25rem", lineHeight: 1.2, weight: 600, family: fonts.display.family },
  h5: { size: "1rem", lineHeight: 1.25, weight: 700, family: fonts.body.family },
  h6: { size: "0.8125rem", lineHeight: 1.3, weight: 700, family: fonts.body.family },
  body: { size: "1rem", lineHeight: 1.55, weight: 400, family: fonts.body.family },
  caption: { size: "0.6875rem", lineHeight: 1.35, weight: 500, family: fonts.utility.family },
} as const;

export const radius = {
  none: "0px",
  sm: "4px",
  md: "8px",
  lg: "14px",
  pill: "999px",
} as const;

export const shadows = {
  none: "none",
  soft: "0 8px 24px rgba(32, 37, 31, 0.08)",
  lifted: "0 18px 45px rgba(32, 37, 31, 0.14)",
  ink: "4px 5px 0 rgba(32, 37, 31, 0.92)",
} as const;

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

/**
 * Signature motif: a torn-edge price tag.
 *
 * Attach `.price-tag` to a price or metadata element. The folded corner is
 * made with `::after`; the irregular lower edge uses a small polygon clip
 * path, keeping the motif lightweight and reproducible without an image.
 */
export const signature = {
  className: "price-tag",
  css: `
.price-tag {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 5px 12px 5px 9px;
  background: var(--color-utility);
  color: var(--color-card);
  font-family: var(--font-utility);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  clip-path: polygon(0 0, 100% 0, 94% 24%, 100% 50%, 94% 76%, 100% 100%, 0 100%);
}
.price-tag::after {
  content: "";
  width: 5px;
  height: 5px;
  margin-left: 8px;
  border-radius: 50%;
  background: var(--color-card);
}
`,
} as const;

export const cssVariables: CSSProperties & Record<`--${string}`, string> = {
  "--color-surface": colors.surface,
  "--color-card": colors.card,
  "--color-ink": colors.ink,
  "--color-accent": colors.accent,
  "--color-secondary": colors.secondary,
  "--color-utility": colors.utility,
  "--font-display": `'${fonts.display.family}', sans-serif`,
  "--font-body": `'${fonts.body.family}', sans-serif`,
  "--font-utility": `'${fonts.utility.family}', monospace`,
  "--radius-sm": radius.sm,
  "--radius-md": radius.md,
  "--radius-lg": radius.lg,
  "--radius-pill": radius.pill,
  "--shadow-soft": shadows.soft,
  "--shadow-lifted": shadows.lifted,
  "--space-8": spacing[8],
} as const;

export type DesignTokenColors = keyof typeof colors;
export type DesignTokenFont = keyof typeof fonts;
export type DesignTokenRadius = keyof typeof radius;
export type DesignTokenShadow = keyof typeof shadows;
export type DesignTokenSpacing = keyof typeof spacing;
