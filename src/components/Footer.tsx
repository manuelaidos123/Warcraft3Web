import { useTranslation } from "react-i18next";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row footer-row">
          <div className="col-lg-4 footer-col">
            <h3>{t("footer.credits")}</h3>
            <div className="contact-info">
              <p>{t("footer.description")}</p>
              <p>
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
            <h3>{t("footer.quickLinks")}</h3>
            <ul className="footer-links">
              <li>
                <a
                  href="#story"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("story");
                  }}
                >
                  {t("nav.story")}
                </a>
              </li>
              <li>
                <a
                  href="#factions"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("factions");
                  }}
                >
                  {t("nav.factions")}
                </a>
              </li>
              <li>
                <a
                  href="#characters"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("characters");
                  }}
                >
                  {t("nav.characters")}
                </a>
              </li>
              <li>
                <a
                  href="#pedia"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("pedia");
                  }}
                >
                  {t("nav.pedia")}
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("timeline");
                  }}
                >
                  {t("nav.timeline")}
                </a>
              </li>
              <li>
                <a
                  href="#cinematics"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("cinematics");
                  }}
                >
                  {t("nav.cinematics")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row footer-bottom">
          <div className="col-12">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}