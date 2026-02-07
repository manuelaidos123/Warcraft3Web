import { useState, useCallback } from "react";
import { factions } from "../data/factions";
import type { Faction } from "../data/factions";

function FactionImage({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  const handleErr = useCallback(() => setErr(true), []);
  if (err) return <div className="faction-img-fallback"><i className="fas fa-shield-alt" aria-hidden="true"></i></div>;
  return <img src={src} alt={alt} className="faction-detail-img" loading="lazy" onError={handleErr} />;
}

function FactionDetail({ faction, onClose }: { faction: Faction; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="faction-modal-title">
      <div className="modal-content faction-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close dialog">
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
        <div className="modal-hero-image" style={{ background: faction.gradient }}>
          <FactionImage src={faction.image} alt={faction.name} />
          <div className="modal-hero-overlay" style={{ background: `linear-gradient(0deg, ${faction.color}ee 0%, ${faction.color}88 40%, transparent 100%)` }}>
            <h2 id="faction-modal-title" className="modal-name">
              {faction.icon} {faction.name}
            </h2>
            <p className="modal-title">{faction.subtitle}</p>
          </div>
        </div>
        <div className="modal-body">
          <p>{faction.lore}</p>

          <h4 className="abilities-heading"><i className="fas fa-users" aria-hidden="true"></i> Notable Leaders</h4>
          <div className="faction-leaders">
            {faction.leaders.map((l) => (
              <span key={l} className="faction-leader-badge" style={{ background: `${faction.color}15`, color: faction.color, border: `1px solid ${faction.color}33` }}>
                {l}
              </span>
            ))}
          </div>

          <h4 className="abilities-heading"><i className="fas fa-chess-knight" aria-hidden="true"></i> Units</h4>
          <div className="faction-units-grid">
            {faction.units.map((u) => (
              <div key={u.name} className="faction-unit-item">
                <span className="unit-name">{u.name}</span>
                <span className="unit-type" style={{ color: faction.color }}>{u.type}</span>
              </div>
            ))}
          </div>

          <h4 className="abilities-heading"><i className="fas fa-star" aria-hidden="true"></i> Key Strengths</h4>
          <ul className="faction-strengths">
            {faction.strengths.map((s) => (
              <li key={s}>
                <i className="fas fa-check-circle" style={{ color: faction.color }} aria-hidden="true"></i> {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function FactionsPage() {
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);

  return (
    <div className="factions-page">
      <section className="page-hero" style={{ background: "linear-gradient(135deg, #6e1a1a 0%, #1a1a2e 50%, #1a3a6e 100%)" }}>
        <div className="container">
          <h1 className="page-hero-title">Factions of Warcraft III</h1>
          <p className="page-hero-subtitle">Four mighty factions vie for dominance over the world of Azeroth</p>
        </div>
      </section>

      <div className="container main-content-inner">
        <div className="factions-grid">
          {factions.map((faction) => (
            <div
              key={faction.id}
              className="faction-card"
              onClick={() => setSelectedFaction(faction)}
              onKeyDown={(e) => { if (e.key === "Enter") setSelectedFaction(faction); }}
              role="button"
              tabIndex={0}
            >
              <div className="faction-card-banner" style={{ background: faction.gradient }}>
                <div className="faction-card-image">
                  <FactionImage src={faction.image} alt={faction.name} />
                </div>
                <div className="faction-card-overlay">
                  <span className="faction-card-icon">{faction.icon}</span>
                  <h2>{faction.name}</h2>
                  <p className="faction-card-subtitle">{faction.subtitle}</p>
                </div>
              </div>
              <div className="faction-card-body">
                <p>{faction.description}</p>
                <div className="faction-card-stats">
                  <div className="faction-stat">
                    <span className="stat-value">{faction.leaders.length}</span>
                    <span className="stat-label">Leaders</span>
                  </div>
                  <div className="faction-stat">
                    <span className="stat-value">{faction.units.length}</span>
                    <span className="stat-label">Units</span>
                  </div>
                  <div className="faction-stat">
                    <span className="stat-value">{faction.strengths.length}</span>
                    <span className="stat-label">Strengths</span>
                  </div>
                </div>
                <button className="btn-primary-wc btn-sm btn-full" style={{ background: faction.color }}>
                  Learn More <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFaction && (
        <FactionDetail faction={selectedFaction} onClose={() => setSelectedFaction(null)} />
      )}
    </div>
  );
}
