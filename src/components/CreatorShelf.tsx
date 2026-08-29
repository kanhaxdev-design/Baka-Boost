import { useRef, useState, useEffect } from "react";
import { cssVariables } from "../../styles/design-tokens";
import type { CreatorShelfData } from "../mock/creatorShelves";
import { ProductPickCard } from "./ProductPickCard";
import { useSmoothScroll, useStaggerAnimation } from "../lib/scroll-hooks";

type CreatorShelfProps = {
  creator: CreatorShelfData;
  onFollow?: (creatorId: string) => void;
};

export function CreatorShelf({ creator, onFollow }: CreatorShelfProps) {
  const { containerRef, scroll } = useSmoothScroll();
  const [following, setFollowing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const shelfHeaderRef = useRef<HTMLDivElement>(null);

  // Detect when shelf enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (shelfHeaderRef.current) {
      observer.observe(shelfHeaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const follow = () => {
    setFollowing((current) => !current);
    onFollow?.(creator.id);
  };

  return (
    <section 
      className={`creator-shelf ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} glass-section unicorn-float`}
      style={cssVariables} 
      aria-labelledby={`${creator.id}-title`}
    >
      <header ref={shelfHeaderRef} className="creator-shelf-header">
        <div className="creator-shelf-identity">
          <img className="creator-shelf-avatar" src={creator.avatar} alt="" />
          <div>
            <h2 id={`${creator.id}-title`}>{creator.displayName}</h2>
            <p>@{creator.handle} <span aria-hidden="true">·</span> {creator.followers} followers</p>
          </div>
        </div>
        <button 
          className={`creator-follow${following ? " is-following" : ""}`} 
          type="button" 
          onClick={follow}
        >
          {following ? "Following" : "Follow"}
        </button>
      </header>
      <div className="creator-shelf-viewport">
        <button 
          className="shelf-arrow shelf-arrow-left hover-elevate" 
          type="button" 
          onClick={() => scroll("left")} 
          aria-label={`Previous ${creator.displayName} picks`}
        >
          <span aria-hidden="true">←</span>
        </button>
        <div 
          ref={containerRef}
          className="creator-shelf-track scroll-smooth" 
          tabIndex={0} 
          aria-label={`${creator.displayName}'s product picks`}
        >
          {creator.products.map((product, index) => (
            <div key={product.id} style={{ animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s forwards` : 'none' }}>
              <ProductPickCard product={product} />
            </div>
          ))}
        </div>
        <button 
          className="shelf-arrow shelf-arrow-right hover-elevate" 
          type="button" 
          onClick={() => scroll("right")} 
          aria-label={`More ${creator.displayName} picks`}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
