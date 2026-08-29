import { useRef } from "react";
import { cssVariables, signature } from "../../styles/design-tokens";
import type { ProductPick } from "../mock/creatorShelves";
import { use3DMouseMove } from "../lib/scroll-hooks";

export function ProductPickCard({ product }: { product: ProductPick }) {
  const { ref, onMouseMove, onMouseLeave, style } = use3DMouseMove();

  const shop = () => window.open(product.affiliateUrl, "_blank", "noopener,noreferrer");

  return (
    <article 
      ref={ref}
      className="pick-card animate-scale-in neuro-card glass-card unicorn" 
      style={{ ...cssVariables, ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="pick-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="pick-card-category">{product.category}</span>
      </div>
      <div className="pick-card-details">
        <h3>{product.name}</h3>
        <span className={signature.className}>{product.price}</span>
        <p>{product.note}</p>
        <button className="pick-card-shop" type="button" onClick={shop}>
          Shop this <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}
