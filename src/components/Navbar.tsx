import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { t } = useTranslation();
  const [navOpen, setNavOpen] = useState(false);

  const handleNav = (page: string) => {
    onNavigate(page);
    setNavOpen(false);
  };

  return (
    <header>
      <nav className="navbar" id="mainNav">
        <div className="container nav-container">
          <a
            className="navbar-brand"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNav("home");
            }}
          >
            <span className="brand-icon">⚔️</span>
            Warcraft III
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setNavOpen(!navOpen)}
            aria-controls="navbarNav"
            aria-expanded={navOpen}
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" aria-hidden="true"></i>
          </button>
          <div className={`navbar-collapse ${navOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === "home" ? "active" : ""}`}
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav("home");
                  }}
                  {...(currentPage === "home" ? { "aria-current": "page" as const } : {})}
                >
                  {t("nav.home")}
                </a>
              </li>
              <li className="nav-item dropdown-parent">
                <a
                  className={`nav-link ${currentPage === "story" ||
                    currentPage === "guide" ||
                    currentPage === "timeline" ||
                    currentPage === "cinematics" ||
                    currentPage === "map"
                    ? "active"
                    : ""
                    }`}
                  href="#story"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav("story");
                  }}
                >
                  {t("nav.story")} <i className="fas fa-chevron-down fa-xs" aria-hidden="true"></i>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#story"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav("story");
                      }}
                    >
                      {t("story.campaigns.roc.title")}
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#story-frozen"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav("story");
                      }}
                    >
                      {t("story.campaigns.tft.title")}
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#guide"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav("guide");
                      }}
                    >
                      {t("nav.guide")}
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#timeline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav("timeline");
                      }}
                    >
                      <i className="fas fa-hourglass-half" aria-hidden="true" style={{ marginRight: "0.35rem" }}></i>
                      {t("nav.timeline")}
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#cinematics"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav("cinematics");
                      }}
                    >
                      <i className="fas fa-film" aria-hidden="true" style={{ marginRight: "0.35rem" }}></i>
                      {t("nav.cinematics")}
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#map"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav("map");
                      }}
                    >
                      <i className="fas fa-map-marked-alt" aria-hidden="true" style={{ marginRight: "0.35rem" }}></i>
                      {t("nav.map")}
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === "factions" ? "active" : ""}`}
                  href="#factions"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav("factions");
                  }}
                  {...(currentPage === "factions" ? { "aria-current": "page" as const } : {})}
                >
                  {t("nav.factions")}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === "characters" ? "active" : ""}`}
                  href="#characters"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav("characters");
                  }}
                  {...(currentPage === "characters" ? { "aria-current": "page" as const } : {})}
                >
                  {t("nav.characters")}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === "pedia" ? "active" : ""}`}
                  href="#pedia"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav("pedia");
                  }}
                  {...(currentPage === "pedia" ? { "aria-current": "page" as const } : {})}
                >
                  {t("nav.pedia")}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === "test" ? "active" : ""}`}
                  href="#test"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav("test");
                  }}
                  {...(currentPage === "test" ? { "aria-current": "page" as const } : {})}
                >
                  {t("nav.test")}
                </a>
              </li>
            </ul>
            <LanguageSelector />
          </div>
        </div>
      </nav>
    </header>
  );
}