import React, { useState, useEffect, useRef, useCallback } from "react";

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  summary: string;
  details: string;
  era: string;
  faction: string;
  factionColor: string;
  icon: string;
  characters: string[];
  image?: string;
}

const eras = [
  { id: "all", label: "All Eras", icon: "fas fa-infinity", color: "#ffd700" },
  { id: "ancient", label: "Ancient History", icon: "fas fa-hourglass-start", color: "#a855f7" },
  { id: "prelude", label: "Prelude to War", icon: "fas fa-scroll", color: "#f59e0b" },
  { id: "reign", label: "Reign of Chaos", icon: "fas fa-crown", color: "#ef4444" },
  { id: "frozen", label: "The Frozen Throne", icon: "fas fa-snowflake", color: "#3b82f6" },
];

const events: TimelineEvent[] = [
  {
    id: 1,
    year: "~10,000 years ago",
    title: "The War of the Ancients",
    summary: "Queen Azshara and the Highborne attempt to summon Sargeras through the Well of Eternity.",
    details: "The Night Elves' reckless use of arcane magic drew the attention of the Burning Legion. Queen Azshara and her Highborne mages began channeling the Well of Eternity's power to create a portal for the dark titan Sargeras. Malfurion Stormrage, Tyrande Whisperwind, and Illidan Stormrage led the resistance against the Legion and the corrupted Highborne, beginning a war that would reshape the world forever.",
    era: "ancient",
    faction: "nightelf",
    factionColor: "#10b981",
    icon: "fas fa-hat-wizard",
    characters: ["Malfurion Stormrage", "Tyrande Whisperwind", "Illidan Stormrage", "Queen Azshara"],
    image: "https://art.hearthstonejson.com/v1/orig/HERO_06.png",
  },
  {
    id: 2,
    year: "~10,000 years ago",
    title: "The Sundering",
    summary: "The Well of Eternity implodes, shattering the supercontinent of Kalimdor.",
    details: "When the heroes disrupted Azshara's portal spell, the Well of Eternity collapsed in on itself. The resulting explosion was catastrophic — the single landmass of ancient Kalimdor was torn apart into multiple continents. The ocean rushed in to fill the void, creating the Maelstrom, a perpetual magical storm at the center of the world. Millions perished, and the world was forever changed. This event ended the Night Elves' golden age.",
    era: "ancient",
    faction: "neutral",
    factionColor: "#6b7280",
    icon: "fas fa-bolt",
    characters: ["Malfurion Stormrage", "Illidan Stormrage"],
  },
  {
    id: 3,
    year: "~10,000 years ago",
    title: "Planting of Nordrassil",
    summary: "The World Tree is planted atop Mount Hyjal to protect the new Well of Eternity.",
    details: "After the Sundering, Illidan secretly created a new Well of Eternity using seven vials of water he had saved. Furious at this recklessness, Malfurion planted an enchanted acorn from the Mother Tree G'Hanir in the Well, which grew into the colossal World Tree Nordrassil. The Dragon Aspects blessed the tree: Nozdormu granted the Night Elves immortality, Alexstrasza ensured it would grow strong, and Ysera linked it to the Emerald Dream. Illidan was imprisoned for his crime.",
    era: "ancient",
    faction: "nightelf",
    factionColor: "#10b981",
    icon: "fas fa-tree",
    characters: ["Malfurion Stormrage", "Illidan Stormrage"],
  },
  {
    id: 4,
    year: "~10,000 years ago",
    title: "Illidan's Imprisonment",
    summary: "Illidan Stormrage is imprisoned beneath Mount Hyjal for ten thousand years.",
    details: "For creating a new Well of Eternity and embracing forbidden arcane magic, Illidan was sentenced to eternal imprisonment in a barrow prison deep beneath Hyjal. Maiev Shadowsong and her Watchers were tasked with guarding him for eternity. Illidan's lover Tyrande chose his brother Malfurion, adding personal anguish to his imprisonment. He would remain chained in darkness for ten millennia.",
    era: "ancient",
    faction: "nightelf",
    factionColor: "#10b981",
    icon: "fas fa-lock",
    characters: ["Illidan Stormrage", "Maiev Shadowsong"],
    image: "https://art.hearthstonejson.com/v1/orig/EX1_614.png",
  },
  {
    id: 5,
    year: "Year 0",
    title: "The First War",
    summary: "The Orcish Horde invades Azeroth through the Dark Portal, destroying Stormwind.",
    details: "Corrupted by the Burning Legion's agent Gul'dan, the orcs of Draenor invaded Azeroth through the Dark Portal — opened with the help of the possessed Guardian Medivh. The savage Horde swept across the Eastern Kingdoms, eventually sacking and destroying the human kingdom of Stormwind. The survivors, led by Anduin Lothar, fled north to seek aid from the other human kingdoms.",
    era: "prelude",
    faction: "horde",
    factionColor: "#c41e3a",
    icon: "fas fa-dungeon",
    characters: ["Medivh", "Gul'dan"],
    image: "https://art.hearthstonejson.com/v1/orig/HERO_08a.png",
  },
  {
    id: 6,
    year: "Year 6",
    title: "The Second War & Alliance of Lordaeron",
    summary: "The human kingdoms unite as the Alliance of Lordaeron to defeat the Horde.",
    details: "Faced with the Horde's continued aggression, the seven human kingdoms united under King Terenas Menethil II of Lordaeron, joined by dwarves, gnomes, and high elves. This Alliance of Lordaeron fought the Horde in a massive conflict across the continent. The Alliance ultimately prevailed, destroying the Dark Portal and placing the surviving orcs in internment camps. This victory would define the political landscape for years to come.",
    era: "prelude",
    faction: "alliance",
    factionColor: "#2f89fc",
    icon: "fas fa-handshake",
    characters: ["Uther the Lightbringer"],
    image: "https://art.hearthstonejson.com/v1/orig/HERO_04.png",
  },
  {
    id: 7,
    year: "Year 18",
    title: "Thrall's Escape & the New Horde",
    summary: "A young orc slave escapes captivity and unites the scattered orc clans.",
    details: "Go'el, known as Thrall, was raised as a gladiator slave by the human Aedelas Blackmoore. He eventually escaped, learned of his shamanic heritage from the Frostwolf clan, and freed the imprisoned orcs from the Alliance internment camps. He reformed the Horde under the values of honor and shamanistic traditions, rejecting the demonic corruption that had enslaved his people. Under his leadership, the New Horde was born.",
    era: "prelude",
    faction: "horde",
    factionColor: "#c41e3a",
    icon: "fas fa-fist-raised",
    characters: ["Thrall"],
    image: "https://art.hearthstonejson.com/v1/orig/HERO_02.png",
  },
  {
    id: 8,
    year: "Year 20",
    title: "The Prophet's Warning",
    summary: "The resurrected Medivh warns the leaders of Azeroth about the coming of the Burning Legion.",
    details: "Medivh, the Last Guardian of Tirisfal — once possessed by Sargeras and responsible for opening the Dark Portal — returned from death as a mysterious Prophet. He appeared to the leaders of the mortal races, warning them of the Burning Legion's imminent third invasion. He urged Thrall to sail west to Kalimdor, warned King Terenas of Lordaeron, and set events in motion that would determine the fate of the world.",
    era: "reign",
    faction: "neutral",
    factionColor: "#f59e0b",
    icon: "fas fa-eye",
    characters: ["Medivh", "Thrall"],
    image: "https://art.hearthstonejson.com/v1/orig/HERO_08a.png",
  },
  {
    id: 9,
    year: "Year 20",
    title: "The Plague of Undeath",
    summary: "A mysterious plague spreads across Lordaeron, turning the living into undead.",
    details: "The Lich King, through his agent Kel'Thuzad and the Cult of the Damned, unleashed a plague of undeath upon the kingdom of Lordaeron. Contaminated grain shipments spread the plague to towns and cities across the land. Those who consumed the tainted grain died and were reanimated as mindless undead servants of the Scourge. Prince Arthas Menethil was tasked with investigating the plague's source.",
    era: "reign",
    faction: "undead",
    factionColor: "#8b5cf6",
    icon: "fas fa-skull-crossbones",
    characters: ["Kel'Thuzad", "Arthas Menethil"],
    image: "https://art.hearthstonejson.com/v1/orig/FP1_013.png",
  },
  {
    id: 10,
    year: "Year 20",
    title: "The Culling of Stratholme",
    summary: "Prince Arthas makes the fateful decision to purge the plague-infected city.",
    details: "Upon discovering that Stratholme's grain supply had been contaminated with the plague, Arthas faced an impossible choice. He ordered the city purged — killing its citizens before they could transform into undead. Uther the Lightbringer and Jaina Proudmoore both refused to participate, and Arthas disbanded the Knights of the Silver Hand. He purged the city himself, a decision widely regarded as the turning point in his descent into darkness.",
    era: "reign",
    faction: "alliance",
    factionColor: "#2f89fc",
    icon: "fas fa-fire",
    characters: ["Arthas Menethil", "Uther the Lightbringer", "Jaina Proudmoore"],
    image: "https://art.hearthstonejson.com/v1/orig/ICC_314.png",
  },
  {
    id: 11,
    year: "Year 20",
    title: "Arthas Claims Frostmourne",
    summary: "Arthas finds and claims the cursed runeblade in Northrend, losing his soul.",
    details: "Pursuing the dreadlord Mal'Ganis to Northrend, Arthas became increasingly desperate. Against the advice of his friend Muradin Bronzebeard, he sought out the cursed runeblade Frostmourne, hidden in a cave of ice. The blade's inscription warned: 'Whomsoever takes up this blade shall wield power eternal. Just as the blade rends flesh, so must power scar the spirit.' Arthas took up the blade, which consumed his soul and bound him to the Lich King's will.",
    era: "reign",
    faction: "undead",
    factionColor: "#8b5cf6",
    icon: "fas fa-icicles",
    characters: ["Arthas Menethil"],
    image: "https://art.hearthstonejson.com/v1/orig/ICC_314.png",
  },
  {
    id: 12,
    year: "Year 20",
    title: "The Fall of Lordaeron",
    summary: "Arthas returns as a Death Knight and murders his father, King Terenas.",
    details: "Corrupted by Frostmourne, Arthas returned to Lordaeron not as a savior but as an agent of the Scourge. In the throne room of the capital, he murdered his own father King Terenas Menethil II, plunging the kingdom into chaos. He then raised Kel'Thuzad as a lich using the Sunwell's power, and the Scourge swept across the Eastern Kingdoms, destroying everything in their path.",
    era: "reign",
    faction: "undead",
    factionColor: "#8b5cf6",
    icon: "fas fa-chess-king",
    characters: ["Arthas Menethil", "Kel'Thuzad"],
  },
  {
    id: 13,
    year: "Year 20",
    title: "The Horde Sails to Kalimdor",
    summary: "Thrall leads the Horde across the Great Sea, following the Prophet's guidance.",
    details: "Heeding Medivh's warning, Thrall gathered the Horde and sailed west across the Great Sea to the unknown continent of Kalimdor. Along the way, they rescued the Darkspear Trolls led by Vol'jin from a sinking island. Upon reaching Kalimdor's shores, Thrall encountered and allied with Cairne Bloodhoof and the Tauren, who were under attack by centaur. Together, they began carving out a new homeland.",
    era: "reign",
    faction: "horde",
    factionColor: "#c41e3a",
    icon: "fas fa-ship",
    characters: ["Thrall", "Cairne Bloodhoof"],
  },
  {
    id: 14,
    year: "Year 20",
    title: "Grom's Sacrifice",
    summary: "Grom Hellscream slays Mannoroth, freeing the orcs from their demonic blood curse.",
    details: "On Kalimdor, Grom Hellscream and his Warsong clan fell under demonic influence after drinking from a corrupted fountain of blood. In his rage, Grom killed the demigod Cenarius. Thrall and Jaina worked together to free Grom from the corruption. Redeemed, Grom confronted the demon lord Mannoroth in a climactic battle. With a mighty blow of his axe Gorehowl, Grom split Mannoroth in two, freeing all orcs from the blood curse — but the demon's death explosion killed Grom. His last words: 'The blood haze has lifted... the demons' curse on our people is over.'",
    era: "reign",
    faction: "horde",
    factionColor: "#c41e3a",
    icon: "fas fa-skull",
    characters: ["Grom Hellscream", "Thrall", "Mannoroth"],
    image: "https://art.hearthstonejson.com/v1/orig/EX1_414.png",
  },
  {
    id: 15,
    year: "Year 21",
    title: "The Battle of Mount Hyjal",
    summary: "The mortal races unite for the first time to defeat the Burning Legion at the World Tree.",
    details: "In the climactic battle of the Third War, humans, orcs, and night elves fought side by side for the first time in history. Jaina commanded the human forces, Thrall led the Horde, and Tyrande and Malfurion rallied the Night Elves. Each army served as a delaying action against Archimonde's relentless advance toward the World Tree. When the demon lord reached Nordrassil, Malfurion unleashed thousands of ancestral wisps that detonated the tree's power, obliterating Archimonde — but at the cost of the Night Elves' immortality and the World Tree's magic.",
    era: "reign",
    faction: "nightelf",
    factionColor: "#10b981",
    icon: "fas fa-mountain",
    characters: ["Thrall", "Jaina Proudmoore", "Tyrande Whisperwind", "Malfurion Stormrage", "Archimonde"],
    image: "https://art.hearthstonejson.com/v1/orig/HERO_09a.png",
  },
  {
    id: 16,
    year: "Year 21",
    title: "Illidan's Release & Transformation",
    summary: "Illidan is freed from prison and consumes the Skull of Gul'dan, becoming a demon hybrid.",
    details: "During the Third War, Tyrande freed Illidan from his ten-thousand-year imprisonment, hoping his power would help against the Legion. Illidan sought out the Skull of Gul'dan, a powerful demonic artifact corrupting Ashenvale's forests. He consumed the skull's power, destroying the artifact but transforming himself into a winged demon-night elf hybrid. Though he used his new power to destroy the dreadlord Tichondrius, Malfurion banished him for embracing demonic power.",
    era: "reign",
    faction: "nightelf",
    factionColor: "#10b981",
    icon: "fas fa-dragon",
    characters: ["Illidan Stormrage", "Tyrande Whisperwind"],
    image: "https://art.hearthstonejson.com/v1/orig/EX1_614.png",
  },
  {
    id: 17,
    year: "Year 21",
    title: "Terror of the Tides",
    summary: "Maiev pursues Illidan as he gathers allies and seeks the Eye of Sargeras.",
    details: "Following his banishment, Illidan was contacted by Kil'jaeden, who tasked him with destroying the Frozen Throne. Illidan allied with Lady Vashj and the Naga, seeking the Eye of Sargeras in the Tomb of Sargeras. Warden Maiev Shadowsong pursued him relentlessly. Illidan used the Eye to attack the Frozen Throne from afar, but Malfurion and Tyrande intervened. When Tyrande fell into a river during battle, Illidan helped rescue her — an act that earned him Malfurion's reluctant pardon.",
    era: "frozen",
    faction: "nightelf",
    factionColor: "#10b981",
    icon: "fas fa-water",
    characters: ["Illidan Stormrage", "Maiev Shadowsong", "Lady Vashj"],
  },
  {
    id: 18,
    year: "Year 21",
    title: "Sylvanas Breaks Free",
    summary: "Sylvanas Windrunner regains her free will and establishes the Forsaken.",
    details: "As the Lich King's power began to wane, Sylvanas Windrunner — the former Ranger-General of Silvermoon whom Arthas had killed and raised as a banshee — regained her free will. She rallied other free-willed undead and orchestrated a coup against the Dreadlords who had seized control of Lordaeron. Sylvanas established the Forsaken, a faction of undead who rejected both the living and the Scourge, claiming the ruins of Lordaeron as their home, the Undercity.",
    era: "frozen",
    faction: "undead",
    factionColor: "#8b5cf6",
    icon: "fas fa-ghost",
    characters: ["Sylvanas Windrunner"],
    image: "https://art.hearthstonejson.com/v1/orig/EX1_016.png",
  },
  {
    id: 19,
    year: "Year 22",
    title: "Curse of the Blood Elves",
    summary: "Prince Kael'thas leads the Blood Elves to Outland after being betrayed by the Alliance.",
    details: "The remnants of the High Elves, devastated by the Scourge's destruction of Silvermoon and the Sunwell, renamed themselves Blood Elves in memory of their fallen kin. Prince Kael'thas Sunstrider struggled to find a cure for their addiction to arcane magic. After being imprisoned by the racist human commander Garithos for accepting Naga aid, Kael'thas escaped with Lady Vashj's help and joined Illidan in Outland, where they conquered the shattered world from the Pit Lord Magtheridon.",
    era: "frozen",
    faction: "alliance",
    factionColor: "#c41e3a",
    icon: "fas fa-sun",
    characters: ["Kael'thas Sunstrider", "Lady Vashj", "Illidan Stormrage"],
  },
  {
    id: 20,
    year: "Year 22",
    title: "The Race to Icecrown",
    summary: "Arthas and Illidan race to the Frozen Throne in a battle that will decide the fate of the Scourge.",
    details: "With the Lich King's power fading, Arthas rushed to Northrend to save his master. Meanwhile, Illidan — ordered by Kil'jaeden to destroy the Frozen Throne or face annihilation — also converged on Icecrown with his Blood Elf and Naga allies. The two forces clashed at the base of Icecrown Glacier in a massive battle, with Arthas's undead Scourge facing off against Illidan's mixed army.",
    era: "frozen",
    faction: "undead",
    factionColor: "#8b5cf6",
    icon: "fas fa-running",
    characters: ["Arthas Menethil", "Illidan Stormrage", "Anub'arak"],
  },
  {
    id: 21,
    year: "Year 22",
    title: "The Ascension",
    summary: "Arthas defeats Illidan, ascends the Frozen Throne, and becomes the Lich King.",
    details: "At the summit of Icecrown Glacier, Arthas and Illidan dueled in single combat. Arthas struck Illidan down with Frostmourne (though Illidan survived). He then climbed the stairway to the Frozen Throne — the diamond-hard ice prison containing the spirit of Ner'zhul, the original Lich King. Arthas shattered the ice with Frostmourne and donned the Helm of Domination, merging his consciousness with Ner'zhul's. 'Now, we are one.' The most powerful Death Knight in existence became the new Lich King, the supreme master of the Undead Scourge.",
    era: "frozen",
    faction: "undead",
    factionColor: "#8b5cf6",
    icon: "fas fa-crown",
    characters: ["Arthas Menethil", "Illidan Stormrage", "Ner'zhul"],
    image: "https://art.hearthstonejson.com/v1/orig/ICC_314.png",
  },
];

function EventImage({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  const handleErr = useCallback(() => setErr(true), []);
  if (err) return null;
  return <img src={src} alt={alt} className="tl-event-img" loading="lazy" onError={handleErr} />;
}

function EventCard({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: TimelineEvent;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const side = index % 2 === 0 ? "left" : "right";

  return (
    <div
      ref={cardRef}
      className={`tl-event tl-event-${side} ${visible ? "tl-event-visible" : ""}`}
    >
      {/* Date marker on the line */}
      <div className="tl-date-marker">
        <div
          className="tl-marker-dot"
          style={{
            background: event.factionColor,
            boxShadow: `0 0 0 4px ${event.factionColor}33, 0 0 20px ${event.factionColor}44`,
          }}
        >
          <i className={event.icon} aria-hidden="true"></i>
        </div>
        <div className="tl-year-label" style={{ color: event.factionColor }}>
          {event.year}
        </div>
      </div>

      {/* Card */}
      <div
        className={`tl-card ${isExpanded ? "tl-card-expanded" : ""}`}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        style={{ borderColor: `${event.factionColor}44` }}
      >
        {/* Card top accent */}
        <div className="tl-card-accent" style={{ background: event.factionColor }}></div>

        {/* Image (if available) */}
        {event.image && (
          <div className="tl-card-image-wrap" style={{ borderBottom: `3px solid ${event.factionColor}` }}>
            <EventImage src={event.image} alt={event.title} />
          </div>
        )}

        <div className="tl-card-body">
          {/* Era badge */}
          <div
            className="tl-era-badge"
            style={{
              background: `${event.factionColor}15`,
              color: event.factionColor,
              border: `1px solid ${event.factionColor}33`,
            }}
          >
            {event.era === "ancient" && "Ancient History"}
            {event.era === "prelude" && "Prelude to War"}
            {event.era === "reign" && "Reign of Chaos"}
            {event.era === "frozen" && "The Frozen Throne"}
          </div>

          <h3 className="tl-card-title">{event.title}</h3>
          <p className="tl-card-summary">{event.summary}</p>

          {/* Expanded content */}
          {isExpanded && (
            <div className="tl-card-details">
              <p className="tl-card-detail-text">{event.details}</p>

              {/* Characters involved */}
              <div className="tl-characters-section">
                <h4 className="tl-characters-heading">
                  <i className="fas fa-users" aria-hidden="true"></i> Key Characters
                </h4>
                <div className="tl-characters-list">
                  {event.characters.map((c) => (
                    <span
                      key={c}
                      className="tl-character-tag"
                      style={{
                        background: `${event.factionColor}12`,
                        color: event.factionColor,
                        border: `1px solid ${event.factionColor}30`,
                      }}
                    >
                      <i className="fas fa-user" aria-hidden="true"></i> {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Expand indicator */}
          <div className="tl-expand-hint" style={{ color: event.factionColor }}>
            <i className={`fas ${isExpanded ? "fa-chevron-up" : "fa-chevron-down"}`} aria-hidden="true"></i>
            <span>{isExpanded ? "Show less" : "Read full story"}</span>
          </div>
        </div>
      </div>

      {/* Connector line to dot */}
      <div className="tl-connector" style={{ background: `${event.factionColor}44` }}></div>
    </div>
  );
}

export function TimelinePage() {
  const [activeEra, setActiveEra] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const filteredEvents = activeEra === "all"
    ? events
    : events.filter((e) => e.era === activeEra);

  const toggleExpand = useCallback((id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  // Group events by era for section headers
  const renderEventsWithHeaders = () => {
    const elements: React.ReactNode[] = [];
    let lastEra = "";

    filteredEvents.forEach((event, index) => {
      if (event.era !== lastEra && activeEra === "all") {
        lastEra = event.era;
        const eraInfo = eras.find((e) => e.id === event.era);
        elements.push(
          <div key={`era-${event.era}`} className="tl-era-divider">
            <div className="tl-era-divider-line"></div>
            <div className="tl-era-divider-content" style={{ background: eraInfo?.color || "#6b7280" }}>
              <i className={eraInfo?.icon || "fas fa-clock"} aria-hidden="true"></i>
              <span>{eraInfo?.label || event.era}</span>
            </div>
            <div className="tl-era-divider-line"></div>
          </div>
        );
      }

      elements.push(
        <EventCard
          key={event.id}
          event={event}
          index={index}
          isExpanded={expandedId === event.id}
          onToggle={() => toggleExpand(event.id)}
        />
      );
    });

    return elements;
  };

  return (
    <div className="timeline-page">
      {/* Hero Banner */}
      <section
        className="page-hero"
        style={{
          background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a3e 30%, #2d1a1a 60%, #0a1a2e 100%)",
        }}
      >
        <div className="container">
          <h1 className="page-hero-title">
            <i className="fas fa-hourglass-half" style={{ marginRight: "0.5rem", fontSize: "0.85em" }} aria-hidden="true"></i>
            Interactive Timeline
          </h1>
          <p className="page-hero-subtitle">
            Journey through the pivotal events that shaped the world of Azeroth
          </p>
          <div className="tl-hero-stats">
            <div className="tl-hero-stat">
              <span className="tl-hero-stat-number">{events.length}</span>
              <span className="tl-hero-stat-label">Events</span>
            </div>
            <div className="tl-hero-stat-divider"></div>
            <div className="tl-hero-stat">
              <span className="tl-hero-stat-number">4</span>
              <span className="tl-hero-stat-label">Eras</span>
            </div>
            <div className="tl-hero-stat-divider"></div>
            <div className="tl-hero-stat">
              <span className="tl-hero-stat-number">10,000+</span>
              <span className="tl-hero-stat-label">Years of History</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container main-content-inner">
        {/* Era Filter Tabs */}
        <div className="tl-era-filters">
          {eras.map((era) => (
            <button
              key={era.id}
              className={`tl-era-filter-btn ${activeEra === era.id ? "active" : ""}`}
              style={
                activeEra === era.id
                  ? { background: era.color, borderColor: era.color, color: "#fff" }
                  : {}
              }
              onClick={() => { setActiveEra(era.id); setExpandedId(null); }}
            >
              <i className={era.icon} aria-hidden="true"></i>
              <span>{era.label}</span>
            </button>
          ))}
        </div>

        {/* Event count */}
        <p className="tl-event-count">
          Showing <strong>{filteredEvents.length}</strong> event{filteredEvents.length !== 1 ? "s" : ""}
          {activeEra !== "all" && (
            <button className="tl-clear-filter" onClick={() => setActiveEra("all")}>
              <i className="fas fa-times" aria-hidden="true"></i> Clear filter
            </button>
          )}
        </p>

        {/* Timeline */}
        <div className="tl-timeline" ref={timelineRef}>
          {/* Vertical line */}
          <div className="tl-line">
            <div className="tl-line-gradient"></div>
          </div>

          {/* Start cap */}
          <div className="tl-cap tl-cap-start">
            <div className="tl-cap-dot">
              <i className="fas fa-play" aria-hidden="true"></i>
            </div>
            <span className="tl-cap-label">The Beginning</span>
          </div>

          {/* Events */}
          {renderEventsWithHeaders()}

          {/* End cap */}
          <div className="tl-cap tl-cap-end">
            <div className="tl-cap-dot tl-cap-dot-end">
              <i className="fas fa-flag-checkered" aria-hidden="true"></i>
            </div>
            <span className="tl-cap-label">
              {activeEra === "frozen" || activeEra === "all"
                ? '"Now, we are one."'
                : "..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
