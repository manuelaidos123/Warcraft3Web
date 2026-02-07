import { useState, useMemo } from "react";
import { useParallaxLayers } from "../hooks/useParallax";

interface PediaEntry {
  id: number;
  name: string;
  category: string;
  description: string;
  details: string;
  icon: string;
  related: string[];
}

const entries: PediaEntry[] = [
  {
    id: 1, name: "Frostmourne", category: "Artifacts",
    description: "The cursed runeblade that stole Arthas' soul and transformed him into a Death Knight.",
    details: "Frostmourne was forged by the Nathrezim dreadlords and placed in Northrend as a trap set by the Lich King. The blade was designed to steal the soul of anyone who wielded it, binding them to the Lich King's will. When Prince Arthas took up the blade in desperation to save his people, he unknowingly sealed his fate. The inscription on its dais read: 'Whomsoever takes up this blade shall wield power eternal. Just as the blade rends flesh, so must power scar the spirit.' Frostmourne could consume the souls of those it slew, adding their power to its wielder.",
    icon: "fas fa-sword", related: ["Arthas Menethil", "The Lich King", "Icecrown Glacier"],
  },
  {
    id: 2, name: "Skull of Gul'dan", category: "Artifacts",
    description: "The skull of the infamous orc warlock, containing immense demonic power.",
    details: "After the warlock Gul'dan's death in the Tomb of Sargeras, his skull was recovered and became a vessel of incredible demonic energy. The Burning Legion used it to corrupt the forests of Ashenvale through the dreadlord Tichondrius. When Illidan Stormrage consumed the skull's power, he was transformed into a demon-hybrid form — half night elf, half demon. This gave him immense power but further alienated him from his people.",
    icon: "fas fa-skull", related: ["Illidan Stormrage", "Gul'dan", "Burning Legion"],
  },
  {
    id: 3, name: "Nordrassil", category: "Locations",
    description: "The World Tree, planted atop Mount Hyjal to protect the second Well of Eternity.",
    details: "After the Sundering that destroyed the original Well of Eternity and split the supercontinent of Kalimdor, Illidan secretly created a new Well using waters he had saved. Malfurion, furious at this recklessness, planted an enchanted acorn from the Mother Tree G'Hanir in the new Well, which grew into the massive World Tree Nordrassil. The Dragon Aspects blessed the tree: Nozdormu granted the Night Elves immortality, Alexstrasza made the tree grow strong, and Ysera linked it to the Emerald Dream. During the Battle of Mount Hyjal, Malfurion sacrificed Nordrassil's power to destroy Archimonde.",
    icon: "fas fa-tree", related: ["Malfurion Stormrage", "Mount Hyjal", "Archimonde"],
  },
  {
    id: 4, name: "Icecrown Glacier", category: "Locations",
    description: "The frozen fortress in Northrend where the Lich King sits upon the Frozen Throne.",
    details: "Icecrown Glacier is the most remote and inhospitable region of Northrend. At its peak sits the Frozen Throne — a block of diamond-hard ice containing the spirit of Ner'zhul, the first Lich King. The area is surrounded by a perpetual blizzard and guarded by the most powerful undead in the Scourge. It was here that Arthas climbed the stairway and shattered the Frozen Throne with Frostmourne, donning the Helm of Domination to merge with Ner'zhul and become the new Lich King.",
    icon: "fas fa-mountain", related: ["Arthas Menethil", "Ner'zhul", "Frozen Throne"],
  },
  {
    id: 5, name: "Dalaran", category: "Locations",
    description: "The magical city of the Kirin Tor mages, destroyed during the Third War.",
    details: "Dalaran was one of the most powerful human city-states, home to the Kirin Tor — the ruling council of mages. It served as the primary center of magical learning on Azeroth. During the Third War, Arthas and Kel'Thuzad assaulted Dalaran to obtain the Book of Medivh, which they used to summon Archimonde into Azeroth. Archimonde destroyed Dalaran with a single spell as a demonstration of the Legion's power. The city was later rebuilt and encased in a magical dome.",
    icon: "fas fa-hat-wizard", related: ["Jaina Proudmoore", "Kel'Thuzad", "Kirin Tor"],
  },
  {
    id: 6, name: "Battle of Mount Hyjal", category: "Events",
    description: "The climactic battle where the mortal races united to defeat the Burning Legion.",
    details: "The Battle of Mount Hyjal was the decisive engagement of the Third War. For the first time in history, humans, orcs, and night elves fought side by side against a common enemy. Jaina Proudmoore commanded the human forces, Thrall led the Horde, and Tyrande and Malfurion rallied the Night Elves. Each army served as a delaying action, buying time for Malfurion to prepare a trap. When Archimonde reached the World Tree, Malfurion unleashed thousands of ancestral spirits that detonated the tree's power, obliterating Archimonde and breaking the Legion's invasion.",
    icon: "fas fa-fire", related: ["Archimonde", "Nordrassil", "Thrall", "Jaina Proudmoore"],
  },
  {
    id: 7, name: "The Culling of Stratholme", category: "Events",
    description: "Prince Arthas' fateful decision to purge the plague-infected city of Stratholme.",
    details: "When Arthas discovered that the grain shipments to Stratholme had been infected with the plague of undeath, he faced an impossible choice: allow the citizens to eat the grain and become undead, or kill them before they turned. Uther and Jaina both refused to participate, and Arthas disbanded the Knights of the Silver Hand rather than accept their refusal. He then purged the city himself, killing its citizens before they could transform. This event is widely considered the turning point in Arthas' descent into darkness.",
    icon: "fas fa-city", related: ["Arthas Menethil", "Uther the Lightbringer", "Mal'Ganis"],
  },
  {
    id: 8, name: "The Sundering", category: "Events",
    description: "The catastrophic event 10,000 years ago that shattered the original continent of Kalimdor.",
    details: "The Sundering was the result of the implosion of the Well of Eternity during the War of the Ancients. When Queen Azshara and her Highborne attempted to use the Well to summon Sargeras into Azeroth, Malfurion and his allies disrupted the spell. The resulting explosion destroyed the Well and split the supercontinent into the landmasses known today as Kalimdor, the Eastern Kingdoms, and Northrend. The ocean rushed in to fill the void, creating the Maelstrom — a perpetual magical storm at the center of the world.",
    icon: "fas fa-bolt", related: ["Malfurion Stormrage", "Queen Azshara", "Well of Eternity"],
  },
  {
    id: 9, name: "Burning Legion", category: "Factions",
    description: "A vast demonic army led by the dark titan Sargeras, bent on destroying all life.",
    details: "The Burning Legion is an army of demons unified under the fallen titan Sargeras. Once the champion of the Pantheon of Titans, Sargeras was driven mad by his endless battle against demons and concluded that existence itself was flawed. He freed the demons he had imprisoned and forged them into the Burning Legion, dedicated to the destruction of all world-souls and life. The Legion has invaded Azeroth three times, each time threatening to destroy the world entirely. Key members include Archimonde, Kil'jaeden, Mannoroth, and Tichondrius.",
    icon: "fas fa-fire-alt", related: ["Sargeras", "Archimonde", "Kil'jaeden", "Mannoroth"],
  },
  {
    id: 10, name: "Kirin Tor", category: "Factions",
    description: "The ruling council of mages based in Dalaran, dedicated to the study and regulation of magic.",
    details: "The Kirin Tor is the governing body of Dalaran and the foremost authority on arcane magic in the Eastern Kingdoms. Founded by the most powerful mages of their time, the Kirin Tor regulated the use of magic and trained new mages. Members included Antonidas (the Archmage who mentored Jaina Proudmoore), Kel'Thuzad (before his turn to necromancy), and Medivh (the Last Guardian). The organization played a crucial role in the Second and Third Wars, though their power was greatly diminished when Dalaran was destroyed.",
    icon: "fas fa-hat-wizard", related: ["Jaina Proudmoore", "Dalaran", "Antonidas"],
  },
  {
    id: 11, name: "Well of Eternity", category: "Artifacts",
    description: "A lake of cosmic power at the center of ancient Kalimdor, source of all arcane magic on Azeroth.",
    details: "The Well of Eternity was a massive lake of scintillating energies, created when a piece of the void was embedded into the world during its creation. The Night Elves built their civilization around it, and its power granted them immortality, immense magical ability, and a deep connection to the world. However, the Well's energy also attracted the attention of the Burning Legion. Its destruction during the Sundering reshaped the world, but Illidan preserved a vial of its waters and created a second, smaller Well atop Mount Hyjal.",
    icon: "fas fa-water", related: ["The Sundering", "Nordrassil", "Illidan Stormrage"],
  },
  {
    id: 12, name: "Helm of Domination", category: "Artifacts",
    description: "The crown of the Lich King, forged to control the undead Scourge.",
    details: "The Helm of Domination was crafted by the Nathrezim dreadlords under the direction of Kil'jaeden. Along with the suit of armor that encased Ner'zhul's spirit, the helm was a key component of the Lich King's power, allowing its wearer to command the Scourge. When Arthas ascended the Frozen Throne and shattered the ice prison, he donned the Helm of Domination, merging his consciousness with Ner'zhul's to become the new Lich King — the most powerful undead being on Azeroth.",
    icon: "fas fa-crown", related: ["Arthas Menethil", "Ner'zhul", "Kil'jaeden"],
  },
];

const categories = ["All", "Artifacts", "Locations", "Events", "Factions"];

export function PediaPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedEntry, setSelectedEntry] = useState<PediaEntry | null>(null);
  const { bgRef, contentRef, bgOffset, contentOffset, opacity } = useParallaxLayers();

  const filtered = useMemo(() => {
    return entries.filter(e => {
      const matchCat = category === "All" || e.category === category;
      const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const categoryColors: Record<string, string> = {
    Artifacts: "#f59e0b",
    Locations: "#10b981",
    Events: "#ef4444",
    Factions: "#8b5cf6",
  };

  return (
    <div className="pedia-page">
      <section className="page-hero parallax-hero" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #4a1a6e 50%, #16213e 100%)" }}>
        <div className="parallax-bg" ref={bgRef} style={{ transform: `translateY(${bgOffset}px)` }}>
          <div className="parallax-decoration parallax-books">
            <span style={{ left: "12%", top: "25%", animationDelay: "0s" }}>📖</span>
            <span style={{ left: "78%", top: "35%", animationDelay: "1.5s" }}>📜</span>
            <span style={{ left: "50%", top: "65%", animationDelay: "3s" }}>🔮</span>
          </div>
        </div>
        <div className="container parallax-content" ref={contentRef} style={{ transform: `translateY(${contentOffset}px)`, opacity }}>
          <h1 className="page-hero-title">WarcraftPedia</h1>
          <p className="page-hero-subtitle">Your comprehensive encyclopedia of Warcraft III lore</p>
        </div>
      </section>

      <div className="container main-content-inner">
        {/* Search & Filter */}
        <div className="pedia-controls">
          <div className="pedia-search-wrap">
            <i className="fas fa-search pedia-search-icon" aria-hidden="true"></i>
            <input
              type="text"
              className="form-control pedia-search"
              placeholder="Search the encyclopedia..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="pedia-categories">
            {categories.map(cat => (
              <button
                key={cat}
                className={`pedia-cat-btn ${category === cat ? "active" : ""}`}
                style={category === cat && cat !== "All" ? { background: categoryColors[cat], borderColor: categoryColors[cat] } : {}}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="pedia-results-count">{filtered.length} {filtered.length === 1 ? "entry" : "entries"} found</p>

        {/* Entries Grid */}
        <div className="pedia-grid">
          {filtered.map(entry => (
            <div
              key={entry.id}
              className="pedia-card"
              onClick={() => setSelectedEntry(entry)}
              onKeyDown={(e) => { if (e.key === "Enter") setSelectedEntry(entry); }}
              role="button"
              tabIndex={0}
            >
              <div className="pedia-card-header" style={{ borderLeft: `4px solid ${categoryColors[entry.category] || "#6b7280"}` }}>
                <div className="pedia-card-icon" style={{ color: categoryColors[entry.category] || "#6b7280" }}>
                  <i className={entry.icon} aria-hidden="true"></i>
                </div>
                <div>
                  <h3>{entry.name}</h3>
                  <span className="pedia-card-category" style={{ color: categoryColors[entry.category] || "#6b7280" }}>
                    {entry.category}
                  </span>
                </div>
              </div>
              <p className="pedia-card-desc">{entry.description}</p>
              <div className="pedia-card-related">
                {entry.related.slice(0, 3).map(r => (
                  <span key={r} className="pedia-related-tag">{r}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search" aria-hidden="true"></i>
            <p>No entries found matching your search.</p>
            <button className="btn-reset" onClick={() => { setSearch(""); setCategory("All"); }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Entry Modal */}
      {selectedEntry && (
        <div className="modal-overlay" onClick={() => setSelectedEntry(null)} role="dialog" aria-modal="true" aria-labelledby="pedia-modal-title">
          <div className="modal-content pedia-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close modal-close-dark" onClick={() => setSelectedEntry(null)} aria-label="Close dialog">
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
            <div className="pedia-modal-header" style={{ background: `${categoryColors[selectedEntry.category]}15`, borderBottom: `3px solid ${categoryColors[selectedEntry.category]}` }}>
              <div className="pedia-modal-icon" style={{ color: categoryColors[selectedEntry.category] }}>
                <i className={selectedEntry.icon} aria-hidden="true"></i>
              </div>
              <div>
                <h2 id="pedia-modal-title">{selectedEntry.name}</h2>
                <span className="pedia-modal-category" style={{ color: categoryColors[selectedEntry.category] }}>
                  {selectedEntry.category}
                </span>
              </div>
            </div>
            <div className="modal-body">
              <p className="pedia-modal-description">{selectedEntry.description}</p>
              <hr />
              <p>{selectedEntry.details}</p>
              <h4 className="abilities-heading"><i className="fas fa-link" aria-hidden="true"></i> Related Topics</h4>
              <div className="pedia-modal-related">
                {selectedEntry.related.map(r => (
                  <span key={r} className="pedia-related-tag pedia-related-tag-lg">{r}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
