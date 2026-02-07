import { useState } from "react";

interface GuideSection {
  id: string;
  title: string;
  icon: string;
  faction: string;
  color: string;
  tips: { title: string; content: string }[];
}

const guideSections: GuideSection[] = [
  {
    id: "general",
    title: "General Strategy",
    icon: "fas fa-chess",
    faction: "general",
    color: "#f59e0b",
    tips: [
      {
        title: "Master the Hero System",
        content: "Heroes are the most powerful units in the game. Always prioritize leveling your hero early by killing creep camps. A level 3 hero with items can turn the tide of early battles. Remember: your hero gains experience from nearby kills, so keep them with your army.",
      },
      {
        title: "Resource Management",
        content: "Gold and lumber are finite resources. Don't queue too many units at once — each queued unit locks up resources. Expand to secondary gold mines early when possible. Use lumber-harvesting upgrades to maximize efficiency.",
      },
      {
        title: "Scouting & Map Control",
        content: "Knowledge is power. Always scout your opponent's base to know what they're building. Use cheap units or abilities like Far Sight to monitor enemy movements. Control key map locations like mercenary camps and item shops.",
      },
      {
        title: "Micro vs Macro",
        content: "Balance micromanagement (controlling individual units in battle) with macromanagement (base building, production queues, upgrades). In lower-level play, strong macro beats fancy micro. Focus on constant unit production and never having idle buildings.",
      },
      {
        title: "Timing Attacks",
        content: "Learn the common timing windows. Early aggression works against fast-expanding opponents. Tech pushes work when your opponent invests in early army. A well-timed attack when your upgrades finish can be devastating.",
      },
    ],
  },
  {
    id: "alliance",
    title: "Alliance Strategy",
    icon: "fas fa-shield-alt",
    faction: "alliance",
    color: "#2f89fc",
    tips: [
      {
        title: "Archmage First",
        content: "The Archmage is the most versatile Alliance hero. Water Elemental provides excellent early harassment and creeping power. Brilliance Aura benefits your casters later. Mass Teleport is one of the best ultimates for map control.",
      },
      {
        title: "Tower Defense",
        content: "Alliance has excellent tower options. Scout Towers upgraded to Guard Towers or Arcane Towers provide strong base defense. Use Arcane Towers against caster-heavy opponents for their mana drain effect.",
      },
      {
        title: "Rifleman + Caster Combo",
        content: "The core Alliance army composition is Riflemen with Priests (for healing) and Sorceresses (for Slow and Polymorph). This gives you range, sustain, and crowd control. Add Spell Breakers against magic-heavy opponents.",
      },
      {
        title: "Militia Rush Defense",
        content: "When attacked early, use Call to Arms to convert your peasants into Militia. They're decent fighters for a short duration. Combined with your hero and a few units, they can repel early aggression effectively.",
      },
    ],
  },
  {
    id: "horde",
    title: "Horde Strategy",
    icon: "fas fa-fist-raised",
    faction: "horde",
    color: "#c41e3a",
    tips: [
      {
        title: "Blademaster Harassment",
        content: "The Blademaster's Wind Walk makes him the best harassment hero in the game. Use him to pick off workers, snipe wounded heroes, and scout. Critical Strike gives him devastating burst damage as he levels up.",
      },
      {
        title: "Grunt Frontline",
        content: "Grunts are one of the best tier-1 melee units. They have good HP and the Brute Strength upgrade makes them formidable. Use them as your frontline while Headhunters or casters deal damage from behind.",
      },
      {
        title: "Spirit Walker Plays",
        content: "Spirit Walkers can turn ethereal to avoid physical damage and cast Spirit Link to redistribute damage across your army. This makes your army incredibly durable. Disenchant also removes all buffs/debuffs in an area.",
      },
      {
        title: "Burrow Mechanic",
        content: "Orc buildings can be set to automatically attack nearby enemies. Burrows can garrison Peons for defense and attack. In emergencies, your entire base can help defend. This makes the Horde harder to rush than other races.",
      },
    ],
  },
  {
    id: "undead",
    title: "Undead Strategy",
    icon: "fas fa-skull-crossbones",
    faction: "undead",
    color: "#8b5cf6",
    tips: [
      {
        title: "Death Knight First",
        content: "The Death Knight is the cornerstone of Undead strategy. Death Coil provides both damage to enemies and healing to your undead units. Unholy Aura gives your army crucial speed. Start with DK for optimal creeping.",
      },
      {
        title: "Fiend-Based Army",
        content: "Crypt Fiends are the backbone of the Undead army. They're ranged, have good HP, and can learn Web to bring down air units. A core of 4-6 Fiends with hero support can handle most early-game situations.",
      },
      {
        title: "Blight Advantage",
        content: "Undead buildings and units regenerate health on Blight. Always expand your Blight before building. Use Blight strategically — even a small patch near a battlefield can provide healing advantage.",
      },
      {
        title: "Necromancer + Statue Combo",
        content: "In the mid-to-late game, Necromancers raising Skeleton Warriors combined with Obsidian Statues for mana and health regeneration create a nearly unstoppable deathball. The key is protecting your Necromancers.",
      },
    ],
  },
  {
    id: "nightelf",
    title: "Night Elf Strategy",
    icon: "fas fa-leaf",
    faction: "nightelf",
    color: "#10b981",
    tips: [
      {
        title: "Demon Hunter Opening",
        content: "The Demon Hunter is an excellent first hero. Mana Burn cripples enemy caster heroes. Immolation helps with creeping. Evasion makes him tanky against physical attacks. He's fast and can harass very effectively.",
      },
      {
        title: "Ancient Management",
        content: "Night Elf buildings are Ancients that can uproot and fight. Use this defensively (uprooting Protectors to move them to a threatened area) and offensively (bringing Ancients to a forward position for a push).",
      },
      {
        title: "Moon Well Conservation",
        content: "Moon Wells provide both mana and health restoration to your units. Don't waste them — use them between fights, not during. Your army's sustainability between engagements is one of Night Elf's biggest advantages.",
      },
      {
        title: "Bear + Dryad Combo",
        content: "Druids of the Claw in bear form provide tanky frontline fighters with Roar (attack buff). Combined with Dryads (magic immune, Slow Poison, Abolish Magic), this creates one of the strongest compositions in the game.",
      },
    ],
  },
];

export function GuidePage() {
  const [activeSection, setActiveSection] = useState("general");
  const section = guideSections.find(s => s.id === activeSection) || guideSections[0];

  return (
    <div className="guide-page">
      <section className="page-hero" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0d3320 50%, #16213e 100%)" }}>
        <div className="container">
          <h1 className="page-hero-title">Campaign Guide</h1>
          <p className="page-hero-subtitle">Master the art of war with strategies for every faction</p>
        </div>
      </section>

      <div className="container main-content-inner">
        {/* Section Tabs */}
        <div className="guide-tabs">
          {guideSections.map(s => (
            <button
              key={s.id}
              className={`guide-tab ${activeSection === s.id ? "active" : ""}`}
              style={activeSection === s.id ? { borderColor: s.color, color: s.color } : {}}
              onClick={() => setActiveSection(s.id)}
            >
              <i className={s.icon} aria-hidden="true"></i>
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div className="guide-content">
          <div className="guide-header" style={{ borderLeft: `4px solid ${section.color}` }}>
            <h2>
              <i className={section.icon} style={{ color: section.color }} aria-hidden="true"></i>{" "}
              {section.title}
            </h2>
          </div>

          <div className="guide-tips-grid">
            {section.tips.map((tip, i) => (
              <div key={i} className="guide-tip-card">
                <div className="guide-tip-number" style={{ background: section.color }}>{i + 1}</div>
                <h3 className="guide-tip-title">{tip.title}</h3>
                <p className="guide-tip-content">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference Table */}
        <section className="guide-reference">
          <h2 className="section-title">Faction Quick Reference</h2>
          <div className="reference-table-wrap">
            <table className="reference-table">
              <thead>
                <tr>
                  <th>Faction</th>
                  <th>Best First Hero</th>
                  <th>Core Unit</th>
                  <th>Key Strength</th>
                  <th>Weakness</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span style={{ color: "#2f89fc", fontWeight: 700 }}>🛡️ Alliance</span></td>
                  <td>Archmage</td>
                  <td>Rifleman</td>
                  <td>Versatility & Defense</td>
                  <td>Slow early game</td>
                </tr>
                <tr>
                  <td><span style={{ color: "#c41e3a", fontWeight: 700 }}>⚔️ Horde</span></td>
                  <td>Blademaster</td>
                  <td>Grunt</td>
                  <td>Raw Power & Harassment</td>
                  <td>Limited air options</td>
                </tr>
                <tr>
                  <td><span style={{ color: "#8b5cf6", fontWeight: 700 }}>💀 Undead</span></td>
                  <td>Death Knight</td>
                  <td>Crypt Fiend</td>
                  <td>Sustain & Attrition</td>
                  <td>Blight dependency</td>
                </tr>
                <tr>
                  <td><span style={{ color: "#10b981", fontWeight: 700 }}>🌙 Night Elves</span></td>
                  <td>Demon Hunter</td>
                  <td>Archer / DotC</td>
                  <td>Mobility & Nature Magic</td>
                  <td>Fragile early units</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
