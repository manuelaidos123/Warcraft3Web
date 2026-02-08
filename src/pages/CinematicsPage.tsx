import React, { useState, useRef, useEffect } from "react";
import { useParallax } from "../hooks/useParallax";

interface Video {
    id: string;
    title: string;
    youtubeId: string;
    description: string;
    duration: string;
    type: "cinematic" | "gameplay" | "reforged";
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
                title: "Arthas' Betrayal - The Culling of Stratholme",
                youtubeId: "fNRA42Ixr2Y",
                description: "Arthas makes the fateful decision to purge the infected city of Stratholme, marking the beginning of his descent into darkness.",
                duration: "3:42",
                type: "cinematic",
            },
            {
                id: "a2",
                title: "Frostmourne Cinematic",
                youtubeId: "YTogEMIkWkA",
                description: "Arthas claims the cursed runeblade Frostmourne in Northrend, sacrificing his soul and Muradin Bronzebeard.",
                duration: "2:15",
                type: "cinematic",
            },
            {
                id: "a3",
                title: "The Fall of Lordaeron",
                youtubeId: "5_Z3Rt6851w",
                description: "Arthas returns to Lordaeron and murders his own father, King Terenas, claiming the throne for the Scourge.",
                duration: "3:28",
                type: "cinematic",
            },
            {
                id: "a4",
                title: "Arthas Ascends the Frozen Throne",
                youtubeId: "BCr7y4SLhck",
                description: "The climactic ending of The Frozen Throne — Arthas shatters the ice prison and dons the Helm of Domination, becoming the Lich King.",
                duration: "4:12",
                type: "cinematic",
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
                title: "Warcraft III: Reign of Chaos - Orc Intro",
                youtubeId: "ql01wIBMRJM",
                description: "Thrall receives a mysterious vision from the Prophet, urging him to lead the Horde across the sea to Kalimdor.",
                duration: "2:30",
                type: "cinematic",
            },
            {
                id: "t2",
                title: "Thrall and Grom - The Horde's Journey",
                youtubeId: "1bKMqS8DIEQ",
                description: "Thrall leads the Horde to Kalimdor, facing new challenges and forging alliances in an unknown land.",
                duration: "3:15",
                type: "gameplay",
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
                title: "Grom Hellscream vs Mannoroth",
                youtubeId: "0-9DKCU_rMY",
                description: "Grom Hellscream's legendary sacrifice — he slays the pit lord Mannoroth, freeing the orcs from the blood curse forever.",
                duration: "3:45",
                type: "cinematic",
            },
            {
                id: "g2",
                title: "Grom Drinks the Blood of Mannoroth",
                youtubeId: "VV20lJnIzHM",
                description: "In a desperate bid for power, Grom and his warriors drink the blood of Mannoroth, falling once again under demonic corruption.",
                duration: "2:10",
                type: "cinematic",
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
                title: "Illidan vs Arthas - Duel at Icecrown",
                youtubeId: "LG3RVCEwCPg",
                description: "The epic final duel between Illidan Stormrage and Arthas Menethil at the foot of the Frozen Throne.",
                duration: "2:48",
                type: "cinematic",
            },
            {
                id: "i2",
                title: "Illidan's Transformation",
                youtubeId: "VQ3lNjH1itk",
                description: "Illidan consumes the Skull of Gul'dan, gaining immense power but transforming into a demon forever.",
                duration: "1:55",
                type: "cinematic",
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
                title: "The Fall of Silvermoon - Sylvanas' Last Stand",
                youtubeId: "H-fXGmBr74I",
                description: "Sylvanas Windrunner defends Quel'Thalas against Arthas' Scourge invasion, ultimately falling and being raised as a banshee.",
                duration: "3:20",
                type: "cinematic",
            },
            {
                id: "s2",
                title: "Sylvanas Breaks Free from the Lich King",
                youtubeId: "jSHOThFVE2U",
                description: "As the Lich King's power weakens, Sylvanas regains her free will and begins building the Forsaken faction.",
                duration: "2:35",
                type: "gameplay",
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
                title: "Night Elf Campaign Intro - Tyrande's Awakening",
                youtubeId: "xT7aFkUeMUQ",
                description: "Tyrande awakens the Druids of the Claw and rallies the Night Elves against the demonic invasion of Ashenvale.",
                duration: "2:40",
                type: "cinematic",
            },
            {
                id: "ty2",
                title: "Tyrande Frees Illidan",
                youtubeId: "SQKdRFYhMxA",
                description: "Against Malfurion's wishes, Tyrande frees Illidan from his ten-thousand-year imprisonment to fight the Burning Legion.",
                duration: "2:20",
                type: "gameplay",
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
                title: "Warcraft III: Reign of Chaos - Opening Cinematic",
                youtubeId: "c2vm-QjK2xQ",
                description: "The iconic opening cinematic of Warcraft III, featuring Medivh as the Prophet warning of the coming apocalypse.",
                duration: "4:32",
                type: "cinematic",
            },
            {
                id: "m2",
                title: "The Prophet's Warning to King Terenas",
                youtubeId: "gCPLiaThIpI",
                description: "Medivh, disguised as The Prophet, warns King Terenas Menethil of the coming plague, but is dismissed by the court.",
                duration: "2:50",
                type: "cinematic",
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
                title: "Uther and Arthas - The Culling of Stratholme",
                youtubeId: "fNRA42Ixr2Y",
                description: "Uther refuses Arthas' order to purge Stratholme, leading to their bitter separation and the disbanding of the Silver Hand.",
                duration: "3:42",
                type: "cinematic",
            },
            {
                id: "u2",
                title: "Death of Uther the Lightbringer",
                youtubeId: "hnd9RzaaXxs",
                description: "Arthas, now a Death Knight, confronts and kills his former mentor Uther to claim the urn of King Terenas.",
                duration: "2:00",
                type: "gameplay",
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
                title: "Jaina and Arthas - Parting Ways",
                youtubeId: "kS73A6ksBqQ",
                description: "Jaina follows the Prophet's advice and sails west to Kalimdor, parting ways with Arthas before his descent into madness.",
                duration: "2:15",
                type: "cinematic",
            },
            {
                id: "j2",
                title: "Battle of Mount Hyjal - The Final Stand",
                youtubeId: "XNpanGSsJOk",
                description: "Jaina leads the Alliance forces alongside Thrall and Tyrande in the desperate defense of the World Tree against Archimonde.",
                duration: "4:55",
                type: "cinematic",
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
                title: "Archimonde's Destruction - Malfurion's Trap",
                youtubeId: "GZcyFpeJctQ",
                description: "Malfurion springs his trap at the World Tree, channeling the power of nature to destroy Archimonde and save Azeroth.",
                duration: "3:30",
                type: "cinematic",
            },
            {
                id: "mf2",
                title: "Malfurion's Awakening",
                youtubeId: "86RsVLwG3cQ",
                description: "After ten thousand years of slumber in the Emerald Dream, Malfurion is awakened by Tyrande to face the Legion threat.",
                duration: "2:10",
                type: "gameplay",
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
                title: "Kel'Thuzad's Resurrection",
                youtubeId: "DjB2IHQN0rc",
                description: "Arthas corrupts the Sunwell to resurrect Kel'Thuzad as a powerful lich, devastating the High Elves of Quel'Thalas.",
                duration: "2:45",
                type: "cinematic",
            },
            {
                id: "k2",
                title: "Kel'Thuzad Summons Archimonde",
                youtubeId: "g8JEoaox9JE",
                description: "Using the Book of Medivh, Kel'Thuzad opens a portal for Archimonde to enter Azeroth, unleashing the Burning Legion.",
                duration: "3:10",
                type: "cinematic",
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
                title: "Thrall Meets Cairne Bloodhoof",
                youtubeId: "rFr4lPIzxjY",
                description: "Thrall encounters Cairne and the Tauren in the Barrens, forming an alliance that would shape the future of the Horde.",
                duration: "2:20",
                type: "gameplay",
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

const typeLabels: Record<string, { label: string; color: string }> = {
    cinematic: { label: "Cinematic", color: "#e67e22" },
    gameplay: { label: "In-Game", color: "#3498db" },
    reforged: { label: "Reforged", color: "#2ecc71" },
};

export function CinematicsPage() {
    const { ref: parallaxRef, offset } = useParallax(0.3);
    const [selectedFaction, setSelectedFaction] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeVideo, setActiveVideo] = useState<{ character: string; video: Video } | null>(null);
    const [expandedCharacter, setExpandedCharacter] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const totalVideos = cinematicsData.reduce((sum, c) => sum + c.videos.length, 0);

    const filteredData = cinematicsData.filter((c) => {
        const matchesFaction = !selectedFaction || c.faction === selectedFaction;
        const matchesSearch =
            !searchQuery ||
            c.character.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.videos.some(
                (v) =>
                    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    v.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        return matchesFaction && matchesSearch;
    });

    useEffect(() => {
        if (activeVideo) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [activeVideo]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && activeVideo) {
                setActiveVideo(null);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [activeVideo]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setActiveVideo(null);
        }
    };

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
                    <span className="floating-decoration" style={{ top: "20%", left: "8%", animationDelay: "0s" }}>🎬</span>
                    <span className="floating-decoration" style={{ top: "60%", left: "15%", animationDelay: "1.5s" }}>🎥</span>
                    <span className="floating-decoration" style={{ top: "30%", right: "10%", animationDelay: "3s" }}>🎞️</span>
                    <span className="floating-decoration" style={{ top: "70%", right: "18%", animationDelay: "4.5s" }}>📽️</span>
                </div>
                <div className="parallax-content">
                    <h1>Cinematics & Videos</h1>
                    <p>Experience the epic moments of Warcraft III through legendary cinematics</p>
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
                {/* Filters */}
                <div className="cinematics-filters">
                    <div className="filter-group">
                        <label htmlFor="cin-faction-filter">Filter by Faction</label>
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
                        <label htmlFor="cin-search">Search Videos</label>
                        <input
                            id="cin-search"
                            type="text"
                            className="filter-input"
                            placeholder="Search characters or videos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-results">
                        Showing <strong>{filteredData.length}</strong> of {cinematicsData.length} characters
                        ({filteredData.reduce((s, c) => s + c.videos.length, 0)} videos)
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
                                                {charData.character.split(" ").map(n => n[0]).join("")}
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
                                            <span className="cin-count-label">video{charData.videos.length > 1 ? "s" : ""}</span>
                                        </div>
                                    </div>

                                    {/* Videos Grid */}
                                    <div className="cin-videos-grid">
                                        {visibleVideos.map((video) => (
                                            <div
                                                key={video.id}
                                                className="cin-video-card"
                                                onClick={() => setActiveVideo({ character: charData.character, video })}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        setActiveVideo({ character: charData.character, video });
                                                    }
                                                }}
                                            >
                                                <div className="cin-thumbnail">
                                                    <img
                                                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                                        alt={video.title}
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                                                        }}
                                                    />
                                                    <div className="cin-play-overlay">
                                                        <div className="cin-play-button">▶</div>
                                                    </div>
                                                    <span className="cin-duration">{video.duration}</span>
                                                    <span
                                                        className="cin-type-badge"
                                                        style={{ backgroundColor: typeLabels[video.type].color }}
                                                    >
                                                        {typeLabels[video.type].label}
                                                    </span>
                                                </div>
                                                <div className="cin-video-info">
                                                    <h4>{video.title}</h4>
                                                    <p>{video.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {charData.videos.length > 2 && (
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
            </main>

            {/* Video Modal */}
            {activeVideo && (
                <div className="cin-modal-backdrop" onClick={handleBackdropClick}>
                    <div className="cin-modal" ref={modalRef}>
                        <button
                            className="cin-modal-close"
                            onClick={() => setActiveVideo(null)}
                            aria-label="Close video"
                        >
                            ✕
                        </button>
                        <div className="cin-modal-video">
                            <iframe
                                src={`https://www.youtube.com/embed/${activeVideo.video.youtubeId}?autoplay=1&rel=0`}
                                title={activeVideo.video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="cin-modal-info">
                            <h3>{activeVideo.video.title}</h3>
                            <div className="cin-modal-meta">
                                <span className="cin-modal-character">{activeVideo.character}</span>
                                <span
                                    className="cin-type-badge"
                                    style={{ backgroundColor: typeLabels[activeVideo.video.type].color }}
                                >
                                    {typeLabels[activeVideo.video.type].label}
                                </span>
                                <span className="cin-modal-duration">⏱ {activeVideo.video.duration}</span>
                            </div>
                            <p>{activeVideo.video.description}</p>
                            <a
                                href={`https://www.youtube.com/watch?v=${activeVideo.video.youtubeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cin-youtube-link"
                            >
                                ▶ Watch on YouTube
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
