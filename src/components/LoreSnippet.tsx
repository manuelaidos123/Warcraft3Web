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
      // Remove the prefix and trim any leading/trailing whitespace
      return snippet.substring(prefix.length).trim();
    }
    return snippet;
  }, []);

  useEffect(() => {
    setIsFading(true);
    const fadeTimeout = setTimeout(() => {
      setDisplayedSnippet(formatSnippet(loreSnippets[currentSnippetIndex]));
      setIsFading(false);
    }, 300); // Duration of fade-out

    return () => clearTimeout(fadeTimeout);
  }, [currentSnippetIndex]);

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
      id="lore-snippet"
      className="p-6 rounded-lg text-center relative"
      style={{
        margin: '2rem auto',
        maxWidth: '1000px', // Increased maxWidth from 960px to 1000px // Increased maxWidth from 800px to 960px
        backgroundColor: '#fcf8e8',
        backgroundImage: `
          radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          radial-gradient(rgba(0, 0, 0, 0.05) 1px, #fcf8e8 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
        border: '2px solid #a89a7a',
        borderRadius: '8px',
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // Removed minHeight to allow natural growth
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Previous Snippet Button */}
      <button
        onClick={showPreviousSnippet}
        className="p-2 bg-gray-600 bg-opacity-40 hover:bg-opacity-60 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-fcf8e8 focus:ring-a89a7a transition-all duration-300"
        aria-label="Previous snippet"
        style={{
          position: 'absolute',
          left: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <i className="fas fa-chevron-left text-xl" style={{ color: '#a89a7a' }}></i>
      </button>

      <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="text-2xl font-bold mb-3" style={{ color: '#4e342e' }}>Did You Know?</h3>
        <p className="text-md italic leading-relaxed px-16" style={{ color: '#4e342e' }}>"{displayedSnippet}"</p> {/* Changed text-lg to text-md and px-10 to px-16 */}
      </div>

      {/* Next Snippet Button */}
      <button
        onClick={showNextSnippet}
        className="p-2 bg-gray-600 bg-opacity-40 hover:bg-opacity-60 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-fcf8e8 focus:ring-a89a7a transition-all duration-300"
        aria-label="Next snippet"
        style={{
          position: 'absolute',
          right: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <i className="fas fa-chevron-right text-xl" style={{ color: '#a89a7a' }}></i>
      </button>
    </section>
  );
};

export default LoreSnippet;
