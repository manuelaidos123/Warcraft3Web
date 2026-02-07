import { useState, useCallback } from "react";
import { characters, factionColors } from "../data/characters";
import { factions } from "../data/factions";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

function CharImage({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  const handleErr = useCallback(() => setErr(true), []);
  if (err) return <div className="hero-char-fallback"><i className="fas fa-user" aria-hidden="true"></i></div>;
  return <img src={src} alt={alt} className="hero-char-img" loading="lazy" onError={handleErr} />;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredChars = characters.filter(c => [1, 2, 4, 11].includes(c.id));

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Warcraft III</h1>
          <p className="hero-subtitle">Reign of Chaos &amp; The Frozen Throne</p>
          <p className="hero-desc">
            Explore the epic saga of heroes, villains, and the battle for Azeroth. 
            Dive into the lore, factions, and legendary characters that defined a generation of gaming.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary-wc" onClick={() => onNavigate("story")}>
              <i className="fas fa-book-open" aria-hidden="true"></i> Explore the Story
            </button>
            <button className="btn-secondary-wc" onClick={() => onNavigate("characters")}>
              <i className="fas fa-users" aria-hidden="true"></i> Meet the Characters
            </button>
          </div>
        </div>
      </section>

      {/* Featured Characters */}
      <section className="home-section">
        <div className="container">
          <h2 className="section-title">Legendary Heroes &amp; Villains</h2>
          <div className="featured-chars-grid">
            {featuredChars.map(c => (
              <div
                key={c.id}
                className="featured-char-card"
                onClick={() => onNavigate("characters")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") onNavigate("characters"); }}
              >
                <div className="featured-char-image" style={{ borderBottom: `4px solid ${factionColors[c.faction]}` }}>
                  <CharImage src={c.image} alt={c.name} />
                </div>
                <div className="featured-char-info">
                  <h3>{c.name}</h3>
                  <p className="featured-char-title">{c.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factions Overview */}
      <section className="home-section home-section-dark">
        <div className="container">
          <h2 className="section-title section-title-light">The Four Factions</h2>
          <div className="factions-overview-grid">
            {factions.map(f => (
              <div
                key={f.id}
                className="faction-overview-card"
                style={{ background: f.gradient }}
                onClick={() => onNavigate("factions")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") onNavigate("factions"); }}
              >
                <span className="faction-overview-icon">{f.icon}</span>
                <h3>{f.name}</h3>
                <p className="faction-overview-subtitle">{f.subtitle}</p>
                <p className="faction-overview-desc">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Teaser */}
      <section className="home-section">
        <div className="container">
          <h2 className="section-title">The Epic Campaigns</h2>
          <div className="campaigns-grid">
            <div className="campaign-card">
              <div className="campaign-card-header" style={{ background: "linear-gradient(135deg, #b8860b, #ffd700)" }}>
                <i className="fas fa-crown campaign-icon" aria-hidden="true"></i>
                <h3>Reign of Chaos</h3>
              </div>
              <div className="campaign-card-body">
                <p>
                  Experience the fall of Lordaeron, the liberation of the Horde, the awakening of the Night Elves, 
                  and the climactic Battle of Mount Hyjal across four interconnected campaigns.
                </p>
                <ul className="campaign-highlights">
                  <li><i className="fas fa-shield-alt" aria-hidden="true"></i> The Scourge of Lordaeron</li>
                  <li><i className="fas fa-fist-raised" aria-hidden="true"></i> The Departure of the Horde</li>
                  <li><i className="fas fa-moon" aria-hidden="true"></i> The Invasion of Kalimdor</li>
                  <li><i className="fas fa-fire" aria-hidden="true"></i> The Battle of Mount Hyjal</li>
                </ul>
                <button className="btn-primary-wc btn-sm" onClick={() => onNavigate("story")}>
                  Read More <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="campaign-card">
              <div className="campaign-card-header" style={{ background: "linear-gradient(135deg, #1a4a7a, #63b3ed)" }}>
                <i className="fas fa-snowflake campaign-icon" aria-hidden="true"></i>
                <h3>The Frozen Throne</h3>
              </div>
              <div className="campaign-card-body">
                <p>
                  Continue the story as Illidan hunts for power, the Blood Elves seek a new destiny, 
                  and Arthas races to Northrend to save the Lich King — or become him.
                </p>
                <ul className="campaign-highlights">
                  <li><i className="fas fa-eye" aria-hidden="true"></i> Terror of the Tides</li>
                  <li><i className="fas fa-skull" aria-hidden="true"></i> Curse of the Blood Elves</li>
                  <li><i className="fas fa-mountain" aria-hidden="true"></i> Legacy of the Damned</li>
                  <li><i className="fas fa-chess-king" aria-hidden="true"></i> The Ascension</li>
                </ul>
                <button className="btn-primary-wc btn-sm" onClick={() => onNavigate("story")}>
                  Read More <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="home-section cta-section">
        <div className="container cta-content">
          <h2>Test Your Knowledge</h2>
          <p>Think you know everything about Warcraft III? Take our quiz and prove it!</p>
          <button className="btn-primary-wc btn-lg" onClick={() => onNavigate("test")}>
            <i className="fas fa-question-circle" aria-hidden="true"></i> Take the Quiz
          </button>
        </div>
      </section>
    </div>
  );
}
