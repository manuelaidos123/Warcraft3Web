import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { characters, factionColors } from "../data/characters";
import { factions } from "../data/factions";
import { useParallaxLayers } from "../hooks/useParallax";
import LoreSnippet from '../components/LoreSnippet';

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
  const { t } = useTranslation();
  const featuredChars = characters.filter(c => [1, 2, 4, 11].includes(c.id));
  const { bgRef, contentRef, bgOffset, contentOffset, opacity } = useParallaxLayers();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section parallax-hero">
        <div className="hero-overlay parallax-bg" ref={bgRef} style={{ transform: `translateY(${bgOffset}px)` }}></div>
        <div className="parallax-stars" style={{ transform: `translateY(${bgOffset * 1.5}px)`, opacity }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="parallax-particle" style={{ left: `${8 + (i * 7.5) % 90}%`, top: `${10 + (i * 13) % 75}%`, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
        <div className="container hero-content parallax-content" ref={contentRef} style={{ transform: `translateY(${contentOffset}px)`, opacity }}>
          <h1 className="hero-title">{t("home.hero.title")}</h1>
          <p className="hero-subtitle">{t("home.hero.subtitle")}</p>
          <p className="hero-desc">
            {t("home.hero.description")}
          </p>
          <div className="hero-buttons">
            <button className="btn-primary-wc" onClick={() => onNavigate("story")}>
              <i className="fas fa-book-open" aria-hidden="true"></i> {t("home.hero.cta.primary")}
            </button>
            <button className="btn-secondary-wc" onClick={() => onNavigate("characters")}>
              <i className="fas fa-users" aria-hidden="true"></i> {t("home.hero.cta.secondary")}
            </button>
          </div>
        </div>
      </section>

      {/* Lore Snippet */}
      <LoreSnippet />

      {/* Featured Characters */}
      <section className="home-section">
        <div className="container">
          <h2 className="section-title">{t("home.features.characters.title")}</h2>
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
          <h2 className="section-title section-title-light">{t("home.features.factions.title")}</h2>
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
          <h2 className="section-title">{t("story.title")}</h2>
          <div className="campaigns-grid">
            <div className="campaign-card">
              <div className="campaign-card-header" style={{ background: "linear-gradient(135deg, #b8860b, #ffd700)" }}>
                <i className="fas fa-crown campaign-icon" aria-hidden="true"></i>
                <h3>{t("story.campaigns.roc.title")}</h3>
              </div>
              <div className="campaign-card-body">
                <p>
                  {t("story.campaigns.roc.description")}
                </p>
                <ul className="campaign-highlights">
                  <li><i className="fas fa-shield-alt" aria-hidden="true"></i> The Scourge of Lordaeron</li>
                  <li><i className="fas fa-fist-raised" aria-hidden="true"></i> The Departure of the Horde</li>
                  <li><i className="fas fa-moon" aria-hidden="true"></i> The Invasion of Kalimdor</li>
                  <li><i className="fas fa-fire" aria-hidden="true"></i> The Battle of Mount Hyjal</li>
                </ul>
                <button className="btn-primary-wc btn-sm" onClick={() => onNavigate("story")}>
                  {t("common.readMore")} <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="campaign-card">
              <div className="campaign-card-header" style={{ background: "linear-gradient(135deg, #1a4a7a, #63b3ed)" }}>
                <i className="fas fa-snowflake campaign-icon" aria-hidden="true"></i>
                <h3>{t("story.campaigns.tft.title")}</h3>
              </div>
              <div className="campaign-card-body">
                <p>
                  {t("story.campaigns.tft.description")}
                </p>
                <ul className="campaign-highlights">
                  <li><i className="fas fa-eye" aria-hidden="true"></i> Terror of the Tides</li>
                  <li><i className="fas fa-skull" aria-hidden="true"></i> Curse of the Blood Elves</li>
                  <li><i className="fas fa-mountain" aria-hidden="true"></i> Legacy of the Damned</li>
                  <li><i className="fas fa-chess-king" aria-hidden="true"></i> The Ascension</li>
                </ul>
                <button className="btn-primary-wc btn-sm" onClick={() => onNavigate("story")}>
                  {t("common.readMore")} <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="home-section cta-section">
        <div className="container cta-content">
          <h2>{t("home.features.quiz.title")}</h2>
          <p>{t("home.features.quiz.description")}</p>
          <button className="btn-primary-wc btn-lg" onClick={() => onNavigate("test")}>
            <i className="fas fa-question-circle" aria-hidden="true"></i> {t("home.hero.cta.secondary")}
          </button>
        </div>
      </section>
    </div>
  );
}