import React, { useState, useEffect, useCallback } from 'react';
import { loreSnippets } from '../data/loreSnippets';

const LoreSnippet: React.FC = () => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState<number>(() => {
    return Math.floor(Math.random() * loreSnippets.length);
  });
  const [displayedSnippet, setDisplayedSnippet] = useState<string>('');
  const [isFading, setIsFading] = useState(false);

  const formatSnippet = useCallback((snippet: string) => {
    const prefix = "Did you know?";
    if (snippet.toLowerCase().startsWith(prefix.toLowerCase())) {
      return snippet.substring(prefix.length).trim();
    }
    return snippet;
  }, []);

  useEffect(() => {
    setIsFading(true);
    const fadeTimeout = setTimeout(() => {
      setDisplayedSnippet(formatSnippet(loreSnippets[currentSnippetIndex]));
      setIsFading(false);
    }, 300);

    return () => clearTimeout(fadeTimeout);
  }, [currentSnippetIndex, formatSnippet]);

  const showNextSnippet = useCallback(() => {
    setIsFading(true);
    setCurrentSnippetIndex((prevIndex) => (prevIndex + 1) % loreSnippets.length);
  }, []);

  const showPreviousSnippet = useCallback(() => {
    setIsFading(true);
    setCurrentSnippetIndex((prevIndex) => (prevIndex - 1 + loreSnippets.length) % loreSnippets.length);
  }, []);

  if (!displayedSnippet && !isFading) {
    return null;
  }

  return (
    <section
      className="lore-snippet"
      style={{
        margin: '2.5rem auto',
        maxWidth: '900px',
        position: 'relative',
        padding: '0',
      }}
    >
      {/* Outer decorative frame */}
      <div
        className="lore-frame"
        style={{
          background: 'linear-gradient(135deg, #3d2914 0%, #5c3d1e 50%, #3d2914 100%)',
          borderRadius: '12px',
          padding: '4px',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 2px 8px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Inner content area */}
        <div
          className="lore-content"
          style={{
            background: `
              linear-gradient(180deg, rgba(252, 248, 232, 1) 0%, rgba(245, 240, 220, 1) 100%)
            `,
            borderRadius: '8px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Parchment texture overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(rgba(139, 90, 43, 0.04) 1px, transparent 1px),
                radial-gradient(rgba(139, 90, 43, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
              pointerEvents: 'none',
            }}
          />

          {/* Decorative corner elements */}
          <div className="lore-corner lore-corner-tl" style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            width: '32px',
            height: '32px',
            borderTop: '3px solid #8b5a2b',
            borderLeft: '3px solid #8b5a2b',
            borderTopLeftRadius: '8px',
          }} />
          <div className="lore-corner lore-corner-tr" style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '32px',
            height: '32px',
            borderTop: '3px solid #8b5a2b',
            borderRight: '3px solid #8b5a2b',
            borderTopRightRadius: '8px',
          }} />
          <div className="lore-corner lore-corner-bl" style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            width: '32px',
            height: '32px',
            borderBottom: '3px solid #8b5a2b',
            borderLeft: '3px solid #8b5a2b',
            borderBottomLeftRadius: '8px',
          }} />
          <div className="lore-corner lore-corner-br" style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            width: '32px',
            height: '32px',
            borderBottom: '3px solid #8b5a2b',
            borderRight: '3px solid #8b5a2b',
            borderBottomRightRadius: '8px',
          }} />

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 4.5rem',
              minHeight: '140px',
              position: 'relative',
            }}
          >
            {/* Previous Button */}
            <button
              onClick={showPreviousSnippet}
              className="lore-nav-btn lore-nav-prev"
              aria-label="Previous snippet"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: 'linear-gradient(135deg, #5c3d1e 0%, #3d2914 100%)',
                color: '#d4a855',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `
                  0 4px 12px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
                transition: 'all 0.25s ease',
              }}
            >
              <i className="fas fa-chevron-left" style={{ fontSize: '1rem' }} />
            </button>

            {/* Snippet content */}
            <div
              className={`lore-text-container ${isFading ? 'lore-fading' : 'lore-visible'}`}
              style={{
                textAlign: 'center',
                opacity: isFading ? 0 : 1,
                transform: isFading ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                maxWidth: '600px',
              }}
            >
              {/* Icon and Title */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                <i
                  className="fas fa-scroll"
                  style={{
                    fontSize: '1.4rem',
                    color: '#8b5a2b',
                    opacity: 0.8,
                  }}
                />
                <h3
                  style={{
                    fontFamily: '"Abyssinica SIL", serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#3d2914',
                    margin: 0,
                    letterSpacing: '1px',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Did You Know?
                </h3>
                <i
                  className="fas fa-scroll"
                  style={{
                    fontSize: '1.4rem',
                    color: '#8b5a2b',
                    opacity: 0.8,
                    transform: 'scaleX(-1)',
                  }}
                />
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: '"Raleway", sans-serif',
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  lineHeight: 1.8,
                  color: '#4a3728',
                  margin: 0,
                }}
              >
                "{displayedSnippet}"
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={showNextSnippet}
              className="lore-nav-btn lore-nav-next"
              aria-label="Next snippet"
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: 'linear-gradient(135deg, #5c3d1e 0%, #3d2914 100%)',
                color: '#d4a855',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `
                  0 4px 12px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
                transition: 'all 0.25s ease',
              }}
            >
              <i className="fas fa-chevron-right" style={{ fontSize: '1rem' }} />
            </button>
          </div>

          {/* Footer with counter and progress dots */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              padding: '0.75rem 1rem 1.25rem',
              borderTop: '1px solid rgba(139, 90, 43, 0.15)',
              background: 'rgba(139, 90, 43, 0.03)',
            }}
          >
            {/* Progress dots */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {loreSnippets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsFading(true);
                    setCurrentSnippetIndex(index);
                  }}
                  aria-label={`Go to snippet ${index + 1}`}
                  style={{
                    width: index === currentSnippetIndex ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: index === currentSnippetIndex
                      ? 'linear-gradient(90deg, #8b5a2b, #d4a855)'
                      : 'rgba(139, 90, 43, 0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Counter */}
            <span
              style={{
                fontFamily: '"Raleway", sans-serif',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#8b5a2b',
                letterSpacing: '0.5px',
              }}
            >
              {currentSnippetIndex + 1} / {loreSnippets.length}
            </span>
          </div>
        </div>
      </div>

      {/* Hover styles for navigation buttons */}
      <style>{`
        .lore-nav-btn:hover {
          transform: translateY(-50%) scale(1.1) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          background: linear-gradient(135deg, #6b4c2a 0%, #4a3518 100%) !important;
        }
        
        .lore-nav-btn:focus {
          outline: 2px solid #d4a855;
          outline-offset: 2px;
        }

        .lore-nav-btn:active {
          transform: translateY(-50%) scale(1.05) !important;
        }

        @media (max-width: 768px) {
          .lore-snippet {
            margin: 1.5rem 0.75rem !important;
          }
          
          .lore-content > div:first-of-type {
            padding: 1.5rem 3.5rem !important;
            min-height: 120px !important;
          }
          
          .lore-nav-btn {
            width: 38px !important;
            height: 38px !important;
          }
          
          .lore-text-container h3 {
            font-size: 1.25rem !important;
          }
          
          .lore-text-container p {
            font-size: 0.95rem !important;
          }
        }

        @media (max-width: 480px) {
          .lore-content > div:first-of-type {
            padding: 1.25rem 3rem !important;
          }
          
          .lore-nav-btn {
            width: '34px' !important;
            height: '34px' !important;
            left: '0.5rem' !important;
            right: '0.5rem' !important;
          }
          
          .lore-corner {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LoreSnippet;