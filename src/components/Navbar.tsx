import { useState } from "react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
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
            onClick={(e) => { e.preventDefault(); handleNav("home"); }}
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
                  onClick={(e) => { e.preventDefault(); handleNav("home"); }}
                  {...(currentPage === "home" ? { "aria-current": "page" as const } : {})}
                >
                  Home
                </a>
              </li>
              <li className="nav-item dropdown-parent">
                <a
                  className={`nav-link ${currentPage === "story" || currentPage === "guide" || currentPage === "timeline" || currentPage === "cinematics" ? "active" : ""}`}
                  href="#story"
                  onClick={(e) => { e.preventDefault(); handleNav("story"); }}
                >
                  Story <i className="fas fa-chevron-down fa-xs" aria-hidden="true"></i>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#story" onClick={(e) => { e.preventDefault(); handleNav("story"); }}>
                      Campaign Overview
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="#story-reign" onClick={(e) => { e.preventDefault(); handleNav("story"); }}>
                      Reign of Chaos
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#story-frozen" onClick={(e) => { e.preventDefault(); handleNav("story"); }}>
                      The Frozen Throne
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="#guide" onClick={(e) => { e.preventDefault(); handleNav("guide"); }}>
                      Campaign Guide
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="#timeline" onClick={(e) => { e.preventDefault(); handleNav("timeline"); }}>
                      <i className="fas fa-hourglass-half" aria-hidden="true" style={{ marginRight: "0.35rem" }}></i>
                      Interactive Timeline
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#cinematics" onClick={(e) => { e.preventDefault(); handleNav("cinematics"); }}>
                      <i className="fas fa-film" aria-hidden="true" style={{ marginRight: "0.35rem" }}></i>
                      Cinematics & Videos
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === "factions" ? "active" : ""}`}
                  href="#factions"
                  onClick={(e) => { e.preventDefault(); handleNav("factions"); }}
                  {...(currentPage === "factions" ? { "aria-current": "page" as const } : {})}
                >
                  Factions
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === "characters" ? "active" : ""}`}
                  href="#characters"
                  onClick={(e) => { e.preventDefault(); handleNav("characters"); }}
                  {...(currentPage === "characters" ? { "aria-current": "page" as const } : {})}
                >
                  Characters
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === "pedia" ? "active" : ""}`}
                  href="#pedia"
                  onClick={(e) => { e.preventDefault(); handleNav("pedia"); }}
                  {...(currentPage === "pedia" ? { "aria-current": "page" as const } : {})}
                >
                  WarcraftPedia
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === "timeline" ? "active" : ""}`}
                  href="#timeline"
                  onClick={(e) => { e.preventDefault(); handleNav("timeline"); }}
                  {...(currentPage === "timeline" ? { "aria-current": "page" as const } : {})}
                >
                  Timeline
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === "cinematics" ? "active" : ""}`}
                  href="#cinematics"
                  onClick={(e) => { e.preventDefault(); handleNav("cinematics"); }}
                  {...(currentPage === "cinematics" ? { "aria-current": "page" as const } : {})}
                >
                  Cinematics
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === "test" ? "active" : ""}`}
                  href="#test"
                  onClick={(e) => { e.preventDefault(); handleNav("test"); }}
                  {...(currentPage === "test" ? { "aria-current": "page" as const } : {})}
                >
                  Test
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
