import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    mapLocations,
    factionColors,
    factionGradients,
    factionNames,
    regionNames,
    MapLocation,
} from "../data/mapLocations";

interface LocationModalProps {
    location: MapLocation | null;
    onClose: () => void;
}

function LocationModal({ location, onClose }: LocationModalProps) {
    const { t } = useTranslation();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (location) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [location, onClose]);

    if (!location) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content map-location-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <i className="fas fa-times" aria-hidden="true"></i>
                </button>

                {location.image && (
                    <div
                        className="map-modal-hero"
                        style={{
                            background: factionGradients[location.faction],
                        }}
                    >
                        <img
                            src={location.image}
                            alt={location.name}
                            className="map-modal-image"
                        />
                        <div className="map-modal-hero-overlay">
                            <h2 className="map-modal-title">{location.name}</h2>
                            <p className="map-modal-region">
                                {regionNames[location.region]}
                            </p>
                        </div>
                    </div>
                )}

                <div className="map-modal-body">
                    {!location.image && (
                        <>
                            <h2 className="map-modal-title">{location.name}</h2>
                            <p className="map-modal-region">
                                {regionNames[location.region]}
                            </p>
                        </>
                    )}

                    <div className="map-modal-badges">
                        <span
                            className="map-modal-faction-badge"
                            style={{
                                background: factionColors[location.faction],
                            }}
                        >
                            {factionNames[location.faction]}
                        </span>
                        <span
                            className="map-modal-type-badge"
                            style={{
                                borderColor: factionColors[location.faction],
                                color: factionColors[location.faction],
                            }}
                        >
                            {location.type.charAt(0).toUpperCase() +
                                location.type.slice(1)}
                        </span>
                    </div>

                    <p className="map-modal-description">{location.description}</p>

                    <div className="map-modal-lore">
                        <h3>
                            <i className="fas fa-book-open" aria-hidden="true"></i>{" "}
                            {t("map.lore") || "Lore"}
                        </h3>
                        <p>{location.lore}</p>
                    </div>

                    {location.relatedCharacters.length > 0 && (
                        <div className="map-modal-section">
                            <h3>
                                <i className="fas fa-users" aria-hidden="true"></i>{" "}
                                {t("map.relatedCharacters") || "Related Characters"}
                            </h3>
                            <div className="map-modal-characters">
                                {location.relatedCharacters.map((char) => (
                                    <span
                                        key={char}
                                        className="map-modal-character-tag"
                                        style={{
                                            borderColor:
                                                factionColors[location.faction],
                                            color: factionColors[location.faction],
                                        }}
                                    >
                                        <i
                                            className="fas fa-user"
                                            aria-hidden="true"
                                        ></i>{" "}
                                        {char}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {location.relatedEvents.length > 0 && (
                        <div className="map-modal-section">
                            <h3>
                                <i className="fas fa-clock" aria-hidden="true"></i>{" "}
                                {t("map.keyEvents") || "Key Events"}
                            </h3>
                            <ul className="map-modal-events">
                                {location.relatedEvents.map((event) => (
                                    <li key={event}>
                                        <i
                                            className="fas fa-chevron-right"
                                            aria-hidden="true"
                                        ></i>{" "}
                                        {event}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface MapMarkerProps {
    location: MapLocation;
    onSelect: (location: MapLocation) => void;
    isHovered: boolean;
    onHover: (id: string | null) => void;
}

function MapMarker({ location, onSelect, isHovered, onHover }: MapMarkerProps) {
    const factionColor = factionColors[location.faction];

    const getMarkerSize = () => {
        switch (location.type) {
            case "capital":
                return 24;
            case "city":
                return 20;
            case "zone":
                return 16;
            case "landmark":
                return 14;
            default:
                return 16;
        }
    };

    const size = getMarkerSize();

    return (
        <div
            className={`map-marker ${isHovered ? "map-marker-hovered" : ""} ${location.type === "capital" ? "map-marker-capital" : ""
                }`}
            style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
            }}
            onMouseEnter={() => onHover(location.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(location)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(location);
                }
            }}
            aria-label={`${location.name} - ${location.description}`}
        >
            {/* Pulse effect for capitals */}
            {location.type === "capital" && (
                <div
                    className="map-marker-pulse"
                    style={{
                        borderColor: factionColor,
                    }}
                />
            )}

            {/* Main marker dot */}
            <div
                className="map-marker-dot"
                style={{
                    width: size,
                    height: size,
                    background: factionColor,
                    boxShadow: `0 0 ${size}px ${factionColor}66, 0 0 ${size * 2}px ${factionColor}33`,
                }}
            >
                {location.type === "capital" && (
                    <i className="fas fa-crown" aria-hidden="true"></i>
                )}
                {location.type === "landmark" && (
                    <i className="fas fa-landmark" aria-hidden="true"></i>
                )}
            </div>

            {/* Tooltip */}
            {isHovered && (
                <div
                    className="map-marker-tooltip"
                    style={{
                        borderColor: factionColor,
                    }}
                >
                    <div
                        className="map-tooltip-header"
                        style={{ background: factionColor }}
                    >
                        <span className="map-tooltip-name">{location.name}</span>
                        <span className="map-tooltip-type">
                            {location.type.toUpperCase()}
                        </span>
                    </div>
                    <div className="map-tooltip-body">
                        <p>{location.description}</p>
                        <span
                            className="map-tooltip-faction"
                            style={{ color: factionColor }}
                        >
                            <i className="fas fa-flag" aria-hidden="true"></i>{" "}
                            {factionNames[location.faction]}
                        </span>
                    </div>
                    <div className="map-tooltip-hint">
                        <i className="fas fa-mouse-pointer" aria-hidden="true"></i>{" "}
                        Click for details
                    </div>
                </div>
            )}
        </div>
    );
}

export function MapPage() {
    const { t } = useTranslation();
    const [selectedLocation, setSelectedLocation] =
        useState<MapLocation | null>(null);
    const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(
        null
    );
    const [activeFaction, setActiveFaction] = useState<string>("all");
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const factions = [
        { id: "all", label: t("map.filter.all") || "All Factions", icon: "fas fa-globe" },
        { id: "alliance", label: factionNames.alliance, icon: "fas fa-shield-alt" },
        { id: "horde", label: factionNames.horde, icon: "fas fa-skull" },
        { id: "undead", label: factionNames.undead, icon: "fas fa-ghost" },
        { id: "nightelf", label: factionNames.nightelf, icon: "fas fa-moon" },
        { id: "neutral", label: factionNames.neutral, icon: "fas fa-balance-scale" },
    ];

    const filteredLocations =
        activeFaction === "all"
            ? mapLocations
            : mapLocations.filter((loc) => loc.faction === activeFaction);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button === 0) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
        }
    }, [pan]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (isDragging) {
                setPan({
                    x: e.clientX - dragStart.x,
                    y: e.clientY - dragStart.y,
                });
            }
        },
        [isDragging, dragStart]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.25, 0.5));
    };

    const handleResetView = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    return (
        <div className="map-page">
            {/* Hero Section */}
            <section
                className="page-hero map-hero"
                style={{
                    background:
                        "linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 30%, #0f1a2e 60%, #1a0a2e 100%)",
                }}
            >
                <div className="container">
                    <h1 className="page-hero-title">
                        <i
                            className="fas fa-map-marked-alt"
                            style={{ marginRight: "0.5rem" }}
                            aria-hidden="true"
                        ></i>
                        {t("map.title") || "Interactive Map of Azeroth"}
                    </h1>
                    <p className="page-hero-subtitle">
                        {t("map.subtitle") || "Explore the World"}
                    </p>
                    <div className="map-hero-stats">
                        <div className="map-hero-stat">
                            <span className="map-hero-stat-number">
                                {mapLocations.length}
                            </span>
                            <span className="map-hero-stat-label">
                                {t("map.locations") || "Locations"}
                            </span>
                        </div>
                        <div className="map-hero-stat-divider"></div>
                        <div className="map-hero-stat">
                            <span className="map-hero-stat-number">3</span>
                            <span className="map-hero-stat-label">Continents</span>
                        </div>
                        <div className="map-hero-stat-divider"></div>
                        <div className="map-hero-stat">
                            <span className="map-hero-stat-number">5</span>
                            <span className="map-hero-stat-label">Factions</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container main-content-inner">
                {/* Map Controls */}
                <div className="map-controls">
                    <div className="map-filters">
                        {factions.map((faction) => (
                            <button
                                key={faction.id}
                                className={`map-filter-btn ${activeFaction === faction.id ? "active" : ""
                                    }`}
                                style={
                                    activeFaction === faction.id && faction.id !== "all"
                                        ? {
                                            background:
                                                factionColors[faction.id],
                                            borderColor:
                                                factionColors[faction.id],
                                        }
                                        : {}
                                }
                                onClick={() => setActiveFaction(faction.id)}
                            >
                                <i className={faction.icon} aria-hidden="true"></i>
                                <span>{faction.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="map-zoom-controls">
                        <button
                            className="map-zoom-btn"
                            onClick={handleZoomIn}
                            disabled={zoom >= 3}
                            aria-label={t("map.zoomIn") || "Zoom In"}
                        >
                            <i className="fas fa-plus" aria-hidden="true"></i>
                        </button>
                        <span className="map-zoom-level">
                            {Math.round(zoom * 100)}%
                        </span>
                        <button
                            className="map-zoom-btn"
                            onClick={handleZoomOut}
                            disabled={zoom <= 0.5}
                            aria-label={t("map.zoomOut") || "Zoom Out"}
                        >
                            <i className="fas fa-minus" aria-hidden="true"></i>
                        </button>
                        <button
                            className="map-reset-btn"
                            onClick={handleResetView}
                            aria-label={t("map.resetView") || "Reset View"}
                        >
                            <i className="fas fa-compress-arrows-alt" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                {/* Location count */}
                <p className="map-locations-count">
                    Showing <strong>{filteredLocations.length}</strong> location
                    {filteredLocations.length !== 1 ? "s" : ""}
                    {activeFaction !== "all" && (
                        <button
                            className="map-clear-filter"
                            onClick={() => setActiveFaction("all")}
                        >
                            <i className="fas fa-times" aria-hidden="true"></i>{" "}
                            Clear filter
                        </button>
                    )}
                </p>

                {/* Interactive Map Container */}
                <div
                    ref={mapContainerRef}
                    className={`map-container ${isDragging ? "map-dragging" : ""}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* Animated background effects */}
                    <div className="map-bg-effects">
                        <div className="map-fog map-fog-1"></div>
                        <div className="map-fog map-fog-2"></div>
                    </div>

                    {/* Map Image and Markers */}
                    <div
                        className="map-inner"
                        style={{
                            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        }}
                    >
                        {/* Base Map Image with multiple fallbacks */}
                        <img
                            src="https://vignette.wikia.nocookie.net/wowpedia/images/7/7e/WorldMap-World-old4.jpg/revision/latest?cb=20140605133040"
                            alt="Map of Azeroth"
                            className="map-base-image"
                            draggable={false}
                            crossOrigin="anonymous"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                const fallbacks = [
                                    "https://i.imgur.com/H5S5EEV.jpeg",
                                    "https://i.imgur.com/nGyOuNk.jpeg"
                                ];
                                const currentSrc = target.src;
                                const currentIndex = fallbacks.findIndex(f => currentSrc.includes(f.split('/')[3]?.split('.')[0] || ''));
                                if (currentIndex < fallbacks.length - 1) {
                                    target.src = fallbacks[currentIndex + 1];
                                } else if (!fallbacks.some(f => currentSrc.includes(f.split('/')[3]?.split('.')[0] || ''))) {
                                    target.src = fallbacks[0];
                                }
                            }}
                        />
                        {/* Fallback gradient background if image fails */}
                        <div className="map-fallback-bg"></div>

                        {/* Location Markers */}
                        {filteredLocations.map((location) => (
                            <MapMarker
                                key={location.id}
                                location={location}
                                onSelect={setSelectedLocation}
                                isHovered={hoveredLocationId === location.id}
                                onHover={setHoveredLocationId}
                            />
                        ))}
                    </div>

                    {/* Faction Legend */}
                    <div className="map-legend">
                        <h4>{t("map.legend") || "Legend"}</h4>
                        <div className="map-legend-items">
                            {Object.entries(factionNames)
                                .filter(([key]) => key !== "burning-legion")
                                .map(([key, name]) => (
                                    <div key={key} className="map-legend-item">
                                        <span
                                            className="map-legend-dot"
                                            style={{
                                                background: factionColors[key],
                                            }}
                                        ></span>
                                        <span>{name}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Map Instructions */}
                <div className="map-instructions">
                    <div className="map-instruction">
                        <i className="fas fa-mouse-pointer" aria-hidden="true"></i>
                        <span>Click on markers for details</span>
                    </div>
                    <div className="map-instruction">
                        <i className="fas fa-hand-paper" aria-hidden="true"></i>
                        <span>Drag to pan the map</span>
                    </div>
                    <div className="map-instruction">
                        <i className="fas fa-search-plus" aria-hidden="true"></i>
                        <span>Use controls to zoom</span>
                    </div>
                </div>
            </div>

            {/* Location Modal */}
            <LocationModal
                location={selectedLocation}
                onClose={() => setSelectedLocation(null)}
            />
        </div>
    );
}