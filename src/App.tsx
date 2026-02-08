import { useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { StoryPage } from "./pages/StoryPage";
import { GuidePage } from "./pages/GuidePage";
import { FactionsPage } from "./pages/FactionsPage";
import { CharactersPage } from "./pages/CharactersPage";
import { PediaPage } from "./pages/PediaPage";
import { TestPage } from "./pages/TestPage";
import { TimelinePage } from "./pages/TimelinePage";

const pageTitles: Record<string, string> = {
  home: "Warcraft III - Home",
  story: "Warcraft III - Story",
  guide: "Warcraft III - Campaign Guide",
  factions: "Warcraft III - Factions",
  characters: "Warcraft III - Characters",
  pedia: "Warcraft III - WarcraftPedia",
  timeline: "Warcraft III - Interactive Timeline",
  test: "Warcraft III - Knowledge Test",
};

function getPageFromHash(): string {
  const hash = window.location.hash.replace("#", "").split("-")[0];
  if (hash && pageTitles[hash]) return hash;
  return "home";
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback((page: string) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    document.title = pageTitles[currentPage] || "Warcraft III";
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "story":
        return <StoryPage />;
      case "guide":
        return <GuidePage />;
      case "factions":
        return <FactionsPage />;
      case "characters":
        return <CharactersPage />;
      case "pedia":
        return <PediaPage />;
      case "timeline":
        return <TimelinePage />;
      case "test":
        return <TestPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
