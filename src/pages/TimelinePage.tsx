import { useParallaxLayers } from "../hooks/useParallax";

export function TimelinePage() {
  const { bgRef, contentRef, bgOffset, contentOffset, opacity } = useParallaxLayers();

  const heroStyle = { background: "linear-gradient(135deg, #1a1a2e 0%, #6e1a1a 50%, #16213e 100%)" };

  return (
    <div className="timeline-page">
      <section className="page-hero parallax-hero" style={heroStyle}>
        <div className="parallax-bg" ref={bgRef} style={{ transform: `translateY(${bgOffset}px)` }}></div>
        <div className="container parallax-content" ref={contentRef} style={{ transform: `translateY(${contentOffset}px)`, opacity }}>
          <h1 className="page-hero-title">Warcraft III Timeline</h1>
          <p className="page-hero-subtitle">A chronological history of the Third War.</p>
        </div>
      </section>

      <div className="container main-content-inner">
        <div className="timeline-placeholder" style={{ padding: "4rem 0", textAlign: "center" }}>
          <p>Interactive timeline coming soon...</p>
        </div>
      </div>
    </div>
  );
}
