import { useState, useMemo, useCallback } from "react";
import {
  characters,
  factionColors,
  factionNames,
  factionGradients,
  roleLabels,
} from "../data/characters";
import type { Character } from "../data/characters";

function CharacterImage({
  character,
  size = "card",
}: {
  character: Character;
  size?: "card" | "modal";
}) {
  const [imgError, setImgError] = useState(false);
  const initials = character.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const gradient =
    factionGradients[character.faction] ||
    "linear-gradient(135deg, #1a1a2e, #16213e)";

  const handleError = useCallback(() => {
    setImgError(true);
  }, []);

  if (imgError) {
    return (
      <div
        className={`character-image-fallback ${size === "modal" ? "modal-fallback" : ""}`}
        style={{ background: gradient }}
      >
        <span className="fallback-initials">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={character.image}
      alt={`Portrait of ${character.name}`}
      className={`character-portrait ${size === "modal" ? "modal-portrait" : "card-portrait"}`}
      loading="lazy"
      onError={handleError}
    />
  );
}

function CharacterCard({
  character,
  onClick,
}: {
  character: Character;
  onClick: () => void;
}) {
  const factionColor = factionColors[character.faction] || "#6b7280";
  const roleInfo = roleLabels[character.role] || {
    label: character.role,
    color: "#6b7280",
  };

  return (
    <div className="col-md-6 col-lg-4">
      <div
        className="character-card"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
        style={{ borderTop: `4px solid ${factionColor}` }}
      >
        <div className="character-card-image">
          <CharacterImage character={character} size="card" />
        </div>
        <div className="character-card-body">
          <h3 className="character-name">{character.name}</h3>
          <p className="character-title">{character.title}</p>
          <div className="character-tags">
            <span
              className="tag faction-tag"
              style={{
                backgroundColor: `${factionColor}22`,
                color: factionColor,
                border: `1px solid ${factionColor}44`,
              }}
            >
              {factionNames[character.faction]}
            </span>
            <span
              className="tag role-tag"
              style={{
                backgroundColor: `${roleInfo.color}22`,
                color: roleInfo.color,
                border: `1px solid ${roleInfo.color}44`,
              }}
            >
              {roleInfo.label}
            </span>
          </div>
          <p className="character-desc">{character.description}</p>
        </div>
      </div>
    </div>
  );
}

function CharacterModal({
  character,
  onClose,
}: {
  character: Character;
  onClose: () => void;
}) {
  const factionColor = factionColors[character.faction] || "#6b7280";
  const roleInfo = roleLabels[character.role] || {
    label: character.role,
    color: "#6b7280",
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-character-name"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
        <div className="modal-hero-image">
          <CharacterImage character={character} size="modal" />
          <div
            className="modal-hero-overlay"
            style={{
              background: `linear-gradient(0deg, ${factionColor}ee 0%, ${factionColor}88 40%, transparent 100%)`,
            }}
          >
            <h2 id="modal-character-name" className="modal-name">
              {character.name}
            </h2>
            <p className="modal-title">{character.title}</p>
          </div>
        </div>
        <div className="modal-body">
          <div className="character-tags" style={{ marginBottom: "1rem" }}>
            <span
              className="tag faction-tag"
              style={{
                backgroundColor: `${factionColor}22`,
                color: factionColor,
                border: `1px solid ${factionColor}44`,
              }}
            >
              {factionNames[character.faction]}
            </span>
            <span
              className="tag role-tag"
              style={{
                backgroundColor: `${roleInfo.color}22`,
                color: roleInfo.color,
                border: `1px solid ${roleInfo.color}44`,
              }}
            >
              {roleInfo.label}
            </span>
          </div>
          <p>{character.description}</p>
          <h4 className="abilities-heading">Abilities</h4>
          <ul className="abilities-list">
            {character.abilities.map((ability) => (
              <li key={ability} className="ability-item">
                <i className="fas fa-bolt" aria-hidden="true"></i> {ability}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function CharactersPage() {
  const [factionFilter, setFactionFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const filteredCharacters = useMemo(() => {
    return characters.filter((c) => {
      const matchFaction = !factionFilter || c.faction === factionFilter;
      const matchRole = !roleFilter || c.role === roleFilter;
      const matchSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFaction && matchRole && matchSearch;
    });
  }, [factionFilter, roleFilter, searchQuery]);

  return (
    <div className="characters-page">
      <section className="page-hero" style={{ background: "linear-gradient(135deg, #1a3a6e 0%, #1a1a2e 50%, #6e1a1a 100%)" }}>
        <div className="container">
          <h1 className="page-hero-title">Characters of Warcraft III</h1>
          <p className="page-hero-subtitle">Meet the legendary heroes and villains who shaped Azeroth</p>
        </div>
      </section>

      <div className="container main-content-inner">
        {/* Filters */}
        <div className="row filters-row">
          <div className="col-md-4">
            <label htmlFor="faction-filter" className="form-label">
              Filter by Faction
            </label>
            <select
              className="form-select"
              id="faction-filter"
              value={factionFilter}
              onChange={(e) => setFactionFilter(e.target.value)}
            >
              <option value="">All Factions</option>
              <option value="alliance">Alliance</option>
              <option value="horde">Horde</option>
              <option value="undead">Undead Scourge</option>
              <option value="nightelf">Night Elves</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="role-filter" className="form-label">
              Filter by Role
            </label>
            <select
              className="form-select"
              id="role-filter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="hero">Hero</option>
              <option value="villain">Villain</option>
              <option value="support">Support</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="character-search" className="form-label">
              Search Characters
            </label>
            <input
              type="text"
              className="form-control"
              id="character-search"
              placeholder="Search characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Character Grid */}
        <div className="row g-4" id="character-grid">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => setSelectedCharacter(character)}
              />
            ))
          ) : (
            <div className="col-12">
              <div className="no-results">
                <i className="fas fa-search" aria-hidden="true"></i>
                <p>No characters found matching your filters.</p>
                <button
                  className="btn-reset"
                  onClick={() => {
                    setFactionFilter("");
                    setRoleFilter("");
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
}
