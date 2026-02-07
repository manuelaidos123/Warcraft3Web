interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row footer-row">
          <div className="col-lg-4 footer-col">
            <h3>Contact</h3>
            <div className="contact-info">
              <p>
                Email:{" "}
                <a href="mailto:contact@warcraft3website.com">
                  contact@warcraft3website.com
                </a>
              </p>
              <p>
                Follow us on:{" "}
                <a
                  href="https://twitter.com/warcraft3"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="social-link"
                >
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
                <a
                  href="https://discord.gg/warcraft3"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="social-link"
                >
                  <i className="fab fa-discord" aria-hidden="true"></i>
                </a>
              </p>
            </div>
          </div>
          <div className="col-lg-4 footer-col footer-logo-col">
            <div className="footer-logo">⚔️ Warcraft III</div>
          </div>
          <div className="col-lg-4 footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#story" onClick={(e) => { e.preventDefault(); onNavigate("story"); }}>Story</a>
              </li>
              <li>
                <a href="#factions" onClick={(e) => { e.preventDefault(); onNavigate("factions"); }}>Factions</a>
              </li>
              <li>
                <a href="#characters" onClick={(e) => { e.preventDefault(); onNavigate("characters"); }}>Characters</a>
              </li>
              <li>
                <a href="#pedia" onClick={(e) => { e.preventDefault(); onNavigate("pedia"); }}>WarcraftPedia</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row footer-bottom">
          <div className="col-12">
            <p>&copy; 2024 Warcraft III Website. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
