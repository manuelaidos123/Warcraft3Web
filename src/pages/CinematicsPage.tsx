import { useState } from "react";
import { useParallax } from "../hooks/useParallax";

interface Video {
    id: string;
    title: string;
    searchQuery: string;
    description: string;
    duration: string;
    type: "cinematic" | "gameplay" | "reforged";
    chapter: string;
}

interface CharacterCinematics {
    character: string;
    faction: string;
    image: string;
    role: string;
    videos: Video[];
}

const cinematicsData: CharacterCinematics[] = [
    {
        character: "Arthas Menethil",
        faction: "alliance",
        image: "https://art.hearthstonejson.com/v1/orig/ICC_314.png",
        role: "Prince of Lordaeron → The Lich King",
        videos: [
            {
                id: "a1",
                title: "The Culling of Stratholme",
                searchQuery: "Warcraft 3 Culling of Stratholme cinematic",
                description:
                    "Arthas makes the fateful decision to purge the infected city of Stratholme, against the wishes of Uther and Jaina. This marks the beginning of his descent into darkness.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Human Campaign",
            },
            {
                id: "a2",
                title: "Arthas Claims Frostmourne",
                searchQuery: "Warcraft 3 Arthas Frostmourne cinematic",
                description:
                    "In the frozen wastes of Northrend, Arthas claims the cursed runeblade Frostmourne, sacrificing his soul and his companion Muradin Bronzebeard.",
                duration: "~2 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Human Campaign",
            },
            {
                id: "a3",
                title: "The Fall of Lordaeron — Arthas Returns",
                searchQuery: "Warcraft 3 Arthas returns Lordaeron cinematic king Terenas",
                description:
                    "Arthas returns to Lordaeron as a Death Knight and murders his own father, King Terenas Menethil II, claiming the throne for the Scourge.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Undead Campaign",
            },
            {
                id: "a4",
                title: "Arthas Ascends the Frozen Throne",
                searchQuery: "Warcraft 3 Frozen Throne ending cinematic Arthas Lich King",
                description:
                    "The climactic ending of The Frozen Throne — Arthas shatters the ice prison and dons the Helm of Domination, merging with Ner'zhul to become the new Lich King.",
                duration: "~4 min",
                type: "cinematic",
                chapter: "The Frozen Throne — Undead Campaign",
            },
        ],
    },
    {
        character: "Thrall",
        faction: "horde",
        image: "https://art.hearthstonejson.com/v1/orig/HERO_02.png",
        role: "Warchief of the Horde",
        videos: [
            {
                id: "t1",
                title: "Warcraft III — Orc Campaign Intro",
                searchQuery: "Warcraft 3 Reign of Chaos Orc intro cinematic Thrall Prophet",
                description:
                    "Thrall receives a mysterious vision from the Prophet, urging him to lead the Horde across the Great Sea to the distant shores of Kalimdor.",
                duration: "~2 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Orc Campaign",
            },
            {
                id: "t2",
                title: "Thrall and Cairne — The Barrens",
                searchQuery: "Warcraft 3 Thrall meets Cairne Bloodhoof Barrens",
                description:
                    "Thrall encounters the Tauren chieftain Cairne Bloodhoof in the Barrens of Kalimdor, forging an alliance that will define the future of the Horde.",
                duration: "~3 min",
                type: "gameplay",
                chapter: "Reign of Chaos — Orc Campaign",
            },
            {
                id: "t3",
                title: "The Battle of Mount Hyjal — Thrall's Stand",
                searchQuery: "Warcraft 3 Battle of Mount Hyjal cinematic Thrall",
                description:
                    "Thrall leads the Horde forces in the desperate defense of the World Tree alongside Jaina Proudmoore and Tyrande Whisperwind against Archimonde and the Burning Legion.",
                duration: "~4 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Night Elf Campaign",
            },
        ],
    },
    {
        character: "Grom Hellscream",
        faction: "horde",
        image: "https://art.hearthstonejson.com/v1/orig/EX1_414.png",
        role: "Chieftain of the Warsong Clan",
        videos: [
            {
                id: "g1",
                title: "Grom Drinks the Blood of Mannoroth",
                searchQuery: "Warcraft 3 Grom Hellscream drinks blood Mannoroth cinematic",
                description:
                    "In a desperate bid for power to defeat Cenarius, Grom and his warriors drink the blood of the pit lord Mannoroth, falling once again under the demonic blood curse.",
                duration: "~2 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Orc Campaign",
            },
            {
                id: "g2",
                title: "Grom Hellscream vs Mannoroth — The Sacrifice",
                searchQuery: "Warcraft 3 Grom Hellscream kills Mannoroth cinematic death",
                description:
                    "Grom Hellscream's legendary sacrifice — he strikes the killing blow against the pit lord Mannoroth, shattering the blood curse and freeing the orcs forever. \"I am free.\"",
                duration: "~3 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Orc Campaign",
            },
        ],
    },
    {
        character: "Illidan Stormrage",
        faction: "nightelf",
        image: "https://art.hearthstonejson.com/v1/orig/EX1_614.png",
        role: "The Betrayer",
        videos: [
            {
                id: "i1",
                title: "Illidan Consumes the Skull of Gul'dan",
                searchQuery: "Warcraft 3 Illidan Skull of Guldan transformation cinematic",
                description:
                    "Illidan consumes the Skull of Gul'dan, gaining immense demonic power. He transforms into a demon hybrid forever, defeating the dreadlord Tichondrius but horrifying Malfurion.",
                duration: "~2 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Night Elf Campaign",
            },
            {
                id: "i2",
                title: "Illidan vs Arthas — Duel at Icecrown",
                searchQuery: "Warcraft 3 Frozen Throne Illidan vs Arthas duel cinematic Icecrown",
                description:
                    "The epic final duel between Illidan Stormrage and Arthas Menethil at the foot of the Frozen Throne. Only one will walk away. Their blades clash in one of the most iconic moments in Warcraft history.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "The Frozen Throne — Undead Campaign",
            },
            {
                id: "i3",
                title: "Terror of the Tides — Illidan's Escape",
                searchQuery: "Warcraft 3 Frozen Throne Terror of the Tides Illidan Maiev cinematic",
                description:
                    "Maiev Shadowsong hunts Illidan across the sea after he escapes from his prison. The chase leads to the Broken Isles and the Tomb of Sargeras.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "The Frozen Throne — Sentinel Campaign",
            },
        ],
    },
    {
        character: "Sylvanas Windrunner",
        faction: "undead",
        image: "https://art.hearthstonejson.com/v1/orig/EX1_016.png",
        role: "Banshee Queen of the Forsaken",
        videos: [
            {
                id: "s1",
                title: "The Fall of Silvermoon — Sylvanas' Last Stand",
                searchQuery: "Warcraft 3 Arthas Sylvanas Silvermoon Quelthalas cinematic",
                description:
                    "Sylvanas Windrunner, Ranger-General of Silvermoon, mounts a desperate defense of Quel'Thalas against Arthas and the Scourge. She falls in battle and is raised as a banshee — a fate worse than death.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Undead Campaign",
            },
            {
                id: "s2",
                title: "Sylvanas Breaks Free — Rise of the Forsaken",
                searchQuery: "Warcraft 3 Frozen Throne Sylvanas breaks free Lich King Forsaken",
                description:
                    "As the Lich King's power weakens, Sylvanas regains her free will. She rallies other freed undead and plots her vengeance against Arthas, founding the Forsaken.",
                duration: "~2 min",
                type: "gameplay",
                chapter: "The Frozen Throne — Undead Campaign",
            },
            {
                id: "s3",
                title: "Sylvanas' Lament — Song for Quel'Thalas",
                searchQuery: "Warcraft 3 Sylvanas Lament song Quelthalas banshee",
                description:
                    "A haunting moment — Sylvanas sings a mournful elven song for her lost homeland of Quel'Thalas, a rare glimpse of the person she once was beneath the banshee's rage.",
                duration: "~2 min",
                type: "gameplay",
                chapter: "The Frozen Throne — Undead Campaign",
            },
        ],
    },
    {
        character: "Tyrande Whisperwind",
        faction: "nightelf",
        image: "https://art.hearthstonejson.com/v1/orig/HERO_09a.png",
        role: "High Priestess of Elune",
        videos: [
            {
                id: "ty1",
                title: "Night Elf Campaign Intro — Tyrande's Warning",
                searchQuery: "Warcraft 3 Reign of Chaos Night Elf campaign intro cinematic Tyrande",
                description:
                    "Tyrande senses the demonic corruption spreading through Ashenvale. She awakens the Druids of the Claw and rallies the Sentinels to defend the ancient forests.",
                duration: "~2 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Night Elf Campaign",
            },
            {
                id: "ty2",
                title: "Tyrande Frees Illidan from Prison",
                searchQuery: "Warcraft 3 Tyrande frees Illidan prison cinematic",
                description:
                    "Against Malfurion's wishes, Tyrande storms Illidan's underground prison and frees him after ten thousand years. She believes only he has the power to stop the Legion.",
                duration: "~2 min",
                type: "gameplay",
                chapter: "Reign of Chaos — Night Elf Campaign",
            },
            {
                id: "ty3",
                title: "The Destruction of Archimonde at Hyjal",
                searchQuery: "Warcraft 3 Archimonde destroyed World Tree Hyjal cinematic ending",
                description:
                    "Tyrande, Malfurion, Thrall, and Jaina combine their forces for a final stand. Malfurion's trap is sprung, and Archimonde is annihilated by the spirits of the World Tree.",
                duration: "~4 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Night Elf Campaign",
            },
        ],
    },
    {
        character: "Medivh",
        faction: "alliance",
        image: "https://art.hearthstonejson.com/v1/orig/HERO_08a.png",
        role: "The Last Guardian / The Prophet",
        videos: [
            {
                id: "m1",
                title: "Warcraft III: Reign of Chaos — Opening Cinematic",
                searchQuery: "Warcraft 3 Reign of Chaos opening cinematic intro",
                description:
                    "The iconic opening cinematic of Warcraft III. A lone orc and human clash on a burning battlefield until the Prophet (Medivh) appears as a raven, foretelling doom for Azeroth.",
                duration: "~4 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Prologue",
            },
            {
                id: "m2",
                title: "The Prophet Warns King Terenas",
                searchQuery: "Warcraft 3 Prophet Medivh warns King Terenas cinematic",
                description:
                    "Medivh, disguised as the Prophet, appears before King Terenas and the court of Lordaeron to warn of the coming plague. He urges them to flee west, but is dismissed as a madman.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Human Campaign",
            },
            {
                id: "m3",
                title: "Medivh Reveals His Identity — The Summit",
                searchQuery: "Warcraft 3 Medivh reveals identity Prophet summit Thrall Jaina",
                description:
                    "At the summit before the Battle of Mount Hyjal, Medivh finally reveals his true identity and convinces the races of Azeroth to unite against the Burning Legion.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Night Elf Campaign",
            },
        ],
    },
    {
        character: "Uther the Lightbringer",
        faction: "alliance",
        image: "https://art.hearthstonejson.com/v1/orig/HERO_04.png",
        role: "Supreme Commander of the Silver Hand",
        videos: [
            {
                id: "u1",
                title: "Uther Defies Arthas at Stratholme",
                searchQuery: "Warcraft 3 Uther Arthas Stratholme argument cinematic Silver Hand",
                description:
                    "Uther refuses Arthas' order to purge the citizens of Stratholme. Their argument leads to the disbanding of the Knights of the Silver Hand — a pivotal turning point.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Human Campaign",
            },
            {
                id: "u2",
                title: "The Death of Uther the Lightbringer",
                searchQuery: "Warcraft 3 Arthas kills Uther death cinematic urn Terenas",
                description:
                    "Arthas, now a Death Knight, confronts and slays his former mentor Uther to claim the urn containing King Terenas' ashes — which he needs to transport Kel'Thuzad's remains.",
                duration: "~2 min",
                type: "gameplay",
                chapter: "Reign of Chaos — Undead Campaign",
            },
        ],
    },
    {
        character: "Jaina Proudmoore",
        faction: "alliance",
        image: "https://art.hearthstonejson.com/v1/orig/HERO_08.png",
        role: "Archmage of the Kirin Tor",
        videos: [
            {
                id: "j1",
                title: "Jaina and Arthas — Parting Ways Before Northrend",
                searchQuery: "Warcraft 3 Jaina Arthas parting ways Northrend cinematic",
                description:
                    "Jaina follows the Prophet's advice and sails west to Kalimdor, parting ways with Arthas before his fateful journey to Northrend. Neither knows this is the last time they'll meet as allies.",
                duration: "~2 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Human Campaign",
            },
            {
                id: "j2",
                title: "Jaina Meets Thrall — An Unlikely Alliance",
                searchQuery: "Warcraft 3 Jaina meets Thrall alliance Kalimdor cinematic Medivh",
                description:
                    "Through the Prophet's guidance, Jaina and Thrall form an unprecedented alliance between humans and orcs to face the Burning Legion's invasion of Kalimdor.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Orc Campaign",
            },
            {
                id: "j3",
                title: "Battle of Mount Hyjal — Jaina's Defense",
                searchQuery: "Warcraft 3 Battle Mount Hyjal Jaina base defense cinematic",
                description:
                    "Jaina commands the Alliance base at the Battle of Mount Hyjal, holding the line against waves of undead and demons to buy time for Malfurion's plan.",
                duration: "~4 min",
                type: "gameplay",
                chapter: "Reign of Chaos — Night Elf Campaign",
            },
        ],
    },
    {
        character: "Malfurion Stormrage",
        faction: "nightelf",
        image: "https://art.hearthstonejson.com/v1/orig/HERO_06.png",
        role: "Archdruid of the Night Elves",
        videos: [
            {
                id: "mf1",
                title: "Malfurion's Awakening from the Emerald Dream",
                searchQuery: "Warcraft 3 Malfurion awakening Emerald Dream Tyrande cinematic",
                description:
                    "After ten thousand years of slumber in the Emerald Dream, Malfurion Stormrage is awakened by Tyrande to face the return of the Burning Legion.",
                duration: "~2 min",
                type: "gameplay",
                chapter: "Reign of Chaos — Night Elf Campaign",
            },
            {
                id: "mf2",
                title: "The Destruction of Archimonde — Malfurion's Trap",
                searchQuery: "Warcraft 3 Archimonde destruction World Tree wisps Malfurion cinematic",
                description:
                    "Malfurion springs his ultimate trap — thousands of wisps converge on Archimonde at the World Tree, detonating in a massive explosion that destroys the demon lord and saves Azeroth.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Night Elf Campaign",
            },
        ],
    },
    {
        character: "Kel'Thuzad",
        faction: "undead",
        image: "https://art.hearthstonejson.com/v1/orig/FP1_013.png",
        role: "Archlich of the Scourge",
        videos: [
            {
                id: "k1",
                title: "Arthas Meets Kel'Thuzad — The Plague Spreads",
                searchQuery: "Warcraft 3 Arthas Kelthuzad plague Lordaeron cinematic",
                description:
                    "Arthas confronts the necromancer Kel'Thuzad, the mastermind behind the plague of undeath ravaging Lordaeron. Their meeting sets Arthas on his path of vengeance.",
                duration: "~2 min",
                type: "gameplay",
                chapter: "Reign of Chaos — Human Campaign",
            },
            {
                id: "k2",
                title: "Kel'Thuzad's Resurrection at the Sunwell",
                searchQuery: "Warcraft 3 Kelthuzad resurrection Sunwell lich cinematic",
                description:
                    "Arthas corrupts the sacred Sunwell of the High Elves to resurrect Kel'Thuzad as a powerful lich, devastating Quel'Thalas in the process and dooming the elven kingdom.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Undead Campaign",
            },
            {
                id: "k3",
                title: "Kel'Thuzad Summons Archimonde",
                searchQuery: "Warcraft 3 Kelthuzad summons Archimonde portal cinematic Dalaran",
                description:
                    "Using the Book of Medivh in Dalaran, Kel'Thuzad opens a massive portal through which Archimonde enters Azeroth, unleashing the full might of the Burning Legion upon the world.",
                duration: "~3 min",
                type: "cinematic",
                chapter: "Reign of Chaos — Undead Campaign",
            },
        ],
    },
    {
        character: "Cairne Bloodhoof",
        faction: "horde",
        image: "https://art.hearthstonejson.com/v1/orig/EX1_110.png",
        role: "High Chieftain of the Tauren",
        videos: [
            {
                id: "c1",
                title: "Thrall Meets Cairne — Alliance of the Horde and Tauren",
                searchQuery: "Warcraft 3 Thrall meets Cairne Bloodhoof Tauren Barrens cinematic",
                description:
                    "Thrall encounters the wise Cairne Bloodhoof and his Tauren people in the Barrens of Kalimdor. Together, they fight off centaur attackers and forge an alliance that will shape the future of the Horde.",
                duration: "~2 min",
                type: "gameplay",
                chapter: "Reign of Chaos — Orc Campaign",
            },
            {
                id: "c2",
                title: "The Tauren Find Mulgore",
                searchQuery: "Warcraft 3 Tauren Cairne Mulgore Thunder Bluff homeland",
                description:
                    "With Thrall's help, the Tauren find a safe homeland in the lush plains of Mulgore, where they establish Thunder Bluff and finally live in peace after years of being hunted by centaur.",
                duration: "~2 min",
                type: "gameplay",
                chapter: "Reign of Chaos — Orc Campaign",
            },
        ],
    },
];

const factionColors: Record<string, string> = {
    alliance: "#2f89fc",
    horde: "#c41e3a",
    undead: "#9b59b6",
    nightelf: "#1abc9c",
};

const factionNames: Record<string, string> = {
    alliance: "Alliance",
    horde: "Horde",
    undead: "Undead Scourge",
    nightelf: "Night Elves",
};

const typeLabels: Record<string, { label: string; icon: string; color: string }> = {
    cinematic: { label: "Cinematic", icon: "🎬", color: "#e67e22" },
    gameplay: { label: "In-Game", icon: "🎮", color: "#3498db" },
    reforged: { label: "Reforged", icon: "✨", color: "#2ecc71" },
};

const chapterColors: Record<string, string> = {
    "Reign of Chaos — Prologue": "#f39c12",
    "Reign of Chaos — Human Campaign": "#2f89fc",
    "Reign of Chaos — Orc Campaign": "#c41e3a",
    "Reign of Chaos — Undead Campaign": "#9b59b6",
    "Reign of Chaos — Night Elf Campaign": "#1abc9c",
    "The Frozen Throne — Sentinel Campaign": "#1abc9c",
    "The Frozen Throne — Undead Campaign": "#9b59b6",
};

function getYouTubeSearchUrl(query: string): string {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function CinematicsPage() {
    const { ref: parallaxRef, offset } = useParallax(0.3);
    const [selectedFaction, setSelectedFaction] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCharacter, setExpandedCharacter] = useState<string | null>(null);

    const totalVideos = cinematicsData.reduce((sum, c) => sum + c.videos.length, 0);

    const filteredData = cinematicsData
        .map((c) => {
            const matchesFaction = !selectedFaction || c.faction === selectedFaction;
            if (!matchesFaction) return null;

            const filteredVideos = c.videos.filter((v) => {
                const matchesType = !selectedType || v.type === selectedType;
                const matchesSearch =
                    !searchQuery ||
                    c.character.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    v.chapter.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesType && matchesSearch;
            });

            if (filteredVideos.length === 0) return null;
            return { ...c, videos: filteredVideos };
        })
        .filter(Boolean) as CharacterCinematics[];

    const filteredVideoCount = filteredData.reduce((s, c) => s + c.videos.length, 0);

    return (
        <>
            {/* Hero Section */}
            <section className="parallax-hero cinematics-hero">
                <div
                    className="parallax-bg"
                    ref={parallaxRef}
                    style={{ transform: `translateY(${offset}px)` }}
                />
                <div className="parallax-decorations">
                    <span className="floating-decoration" style={{ top: "15%", left: "5%", animationDelay: "0s", fontSize: "2rem" }}>🎬</span>
                    <span className="floating-decoration" style={{ top: "55%", left: "12%", animationDelay: "1.5s", fontSize: "1.5rem" }}>🎥</span>
                    <span className="floating-decoration" style={{ top: "25%", right: "8%", animationDelay: "3s", fontSize: "2rem" }}>🎞️</span>
                    <span className="floating-decoration" style={{ top: "65%", right: "15%", animationDelay: "4.5s", fontSize: "1.5rem" }}>⚔️</span>
                    <span className="floating-decoration" style={{ top: "40%", left: "80%", animationDelay: "2s", fontSize: "1.8rem" }}>🛡️</span>
                </div>
                <div className="parallax-content">
                    <h1>Cinematics & Videos</h1>
                    <p>Relive the epic moments of Warcraft III through legendary cinematics and in-game scenes</p>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-number">{cinematicsData.length}</span>
                            <span className="hero-stat-label">Characters</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-number">{totalVideos}</span>
                            <span className="hero-stat-label">Videos</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-number">4</span>
                            <span className="hero-stat-label">Factions</span>
                        </div>
                    </div>
                </div>
            </section>

            <main className="container cinematics-main">
                {/* Info Banner */}
                <div className="cin-info-banner">
                    <span className="cin-info-icon">💡</span>
                    <p>
                        Each video card links to a <strong>YouTube search</strong> for that specific cinematic scene.
                        Click any card to find the best available version of that moment on YouTube.
                    </p>
                </div>

                {/* Filters */}
                <div className="cinematics-filters">
                    <div className="filter-group">
                        <label htmlFor="cin-faction-filter">Faction</label>
                        <select
                            id="cin-faction-filter"
                            className="filter-select"
                            value={selectedFaction}
                            onChange={(e) => setSelectedFaction(e.target.value)}
                        >
                            <option value="">All Factions</option>
                            <option value="alliance">Alliance</option>
                            <option value="horde">Horde</option>
                            <option value="undead">Undead Scourge</option>
                            <option value="nightelf">Night Elves</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="cin-type-filter">Type</label>
                        <select
                            id="cin-type-filter"
                            className="filter-select"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="cinematic">🎬 Cinematics</option>
                            <option value="gameplay">🎮 In-Game Scenes</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="cin-search">Search</label>
                        <input
                            id="cin-search"
                            type="text"
                            className="filter-input"
                            placeholder="Search characters, videos, campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-results">
                        Showing <strong>{filteredData.length}</strong> character{filteredData.length !== 1 ? "s" : ""} · <strong>{filteredVideoCount}</strong> video{filteredVideoCount !== 1 ? "s" : ""}
                    </div>
                </div>

                {/* Character Sections */}
                {filteredData.length === 0 ? (
                    <div className="no-results">
                        <span className="no-results-icon">🎬</span>
                        <h3>No videos found</h3>
                        <p>Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    <div className="cinematics-list">
                        {filteredData.map((charData) => {
                            const isExpanded = expandedCharacter === charData.character;
                            const visibleVideos = isExpanded ? charData.videos : charData.videos.slice(0, 2);
                            const hasMore = charData.videos.length > 2;

                            return (
                                <div
                                    key={charData.character}
                                    className="character-cinematics-card"
                                    style={{ borderLeftColor: factionColors[charData.faction] }}
                                >
                                    {/* Character Header */}
                                    <div className="cin-character-header">
                                        <div className="cin-character-portrait">
                                            <img
                                                src={charData.image}
                                                alt={charData.character}
                                                loading="lazy"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = "none";
                                                    const fallback = target.nextElementSibling as HTMLElement;
                                                    if (fallback) fallback.style.display = "flex";
                                                }}
                                            />
                                            <div className="cin-portrait-fallback" style={{ display: "none" }}>
                                                {charData.character.split(" ").map((n) => n[0]).join("")}
                                            </div>
                                        </div>
                                        <div className="cin-character-info">
                                            <h2>{charData.character}</h2>
                                            <p className="cin-character-role">{charData.role}</p>
                                            <span
                                                className="cin-faction-badge"
                                                style={{ backgroundColor: factionColors[charData.faction] }}
                                            >
                                                {factionNames[charData.faction]}
                                            </span>
                                        </div>
                                        <div className="cin-video-count">
                                            <span className="cin-count-number">{charData.videos.length}</span>
                                            <span className="cin-count-label">
                                                video{charData.videos.length > 1 ? "s" : ""}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Videos Grid */}
                                    <div className="cin-videos-grid">
                                        {visibleVideos.map((video) => (
                                            <a
                                                key={video.id}
                                                href={getYouTubeSearchUrl(video.searchQuery)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="cin-video-card"
                                                title={`Search YouTube for: ${video.title}`}
                                            >
                                                <div className="cin-thumbnail">
                                                    <div
                                                        className="cin-thumbnail-art"
                                                        style={{
                                                            backgroundImage: `url(${charData.image})`,
                                                        }}
                                                    >
                                                        <div className="cin-thumbnail-overlay">
                                                            <div className="cin-play-button">
                                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                                                    <path d="M8 5v14l11-7z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="cin-duration">{video.duration}</span>
                                                    <span
                                                        className="cin-type-badge"
                                                        style={{ backgroundColor: typeLabels[video.type].color }}
                                                    >
                                                        {typeLabels[video.type].icon} {typeLabels[video.type].label}
                                                    </span>
                                                </div>
                                                <div className="cin-video-info">
                                                    <h4>{video.title}</h4>
                                                    <span
                                                        className="cin-chapter-tag"
                                                        style={{
                                                            borderColor: chapterColors[video.chapter] || "#666",
                                                            color: chapterColors[video.chapter] || "#666",
                                                        }}
                                                    >
                                                        {video.chapter}
                                                    </span>
                                                    <p>{video.description}</p>
                                                    <span className="cin-yt-link">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: "middle", marginRight: "4px" }}>
                                                            <path d="M21.8 8s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.4 5 12 5 12 5s-4.4 0-7.1.2c-.4 0-1.2.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9 1.5.1 6.9.2 6.9.2s4.4 0 7.1-.2c.4 0 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5c0-1.6-.2-3.2-.2-3.2zM9.9 15.1V8.9l5.1 3.1-5.1 3.1z" />
                                                        </svg>
                                                        Search on YouTube →
                                                    </span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    {hasMore && (
                                        <button
                                            className="cin-show-more"
                                            onClick={() =>
                                                setExpandedCharacter(isExpanded ? null : charData.character)
                                            }
                                        >
                                            {isExpanded
                                                ? "Show Less ▲"
                                                : `Show ${charData.videos.length - 2} More Video${charData.videos.length - 2 > 1 ? "s" : ""} ▼`}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* All Cinematics Playlist Link */}
                <div className="cin-playlist-banner">
                    <div className="cin-playlist-content">
                        <h3>📺 Want to watch all cinematics in order?</h3>
                        <p>Search for the complete Warcraft III cinematic collection on YouTube</p>
                        <a
                            href={getYouTubeSearchUrl("Warcraft 3 all cinematics in order Reign of Chaos Frozen Throne")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cin-playlist-link"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: "middle", marginRight: "6px" }}>
                                <path d="M21.8 8s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.4 5 12 5 12 5s-4.4 0-7.1.2c-.4 0-1.2.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9 1.5.1 6.9.2 6.9.2s4.4 0 7.1-.2c.4 0 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5c0-1.6-.2-3.2-.2-3.2zM9.9 15.1V8.9l5.1 3.1-5.1 3.1z" />
                            </svg>
                            Search All Cinematics on YouTube →
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}
