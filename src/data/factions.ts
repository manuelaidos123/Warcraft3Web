export interface Faction {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  gradient: string;
  description: string;
  lore: string;
  leaders: string[];
  units: { name: string; type: string }[];
  strengths: string[];
  image: string;
  icon: string;
}

export const factions: Faction[] = [
  {
    id: "alliance",
    name: "Alliance",
    subtitle: "The Forces of Light",
    color: "#2f89fc",
    gradient: "linear-gradient(135deg, #1a3a6e 0%, #2f89fc 100%)",
    description:
      "The Alliance of Lordaeron, once the mightiest faction on Azeroth, now fights to preserve humanity and its allies against the threats that seek to destroy them.",
    lore: "The Alliance was originally formed during the Second War to combat the invading Orcish Horde. Led by the Kingdom of Lordaeron, it united the seven human kingdoms, the dwarves of Ironforge, the gnomes of Gnomeregan, and the high elves of Quel'Thalas. Though the Alliance was victorious, internal conflicts led to its partial dissolution. During the Third War, Prince Arthas' fall to darkness and the Scourge's devastation of Lordaeron shattered the Alliance's power. Jaina Proudmoore led survivors to Kalimdor, where they forged new alliances to face the Burning Legion.",
    leaders: ["Arthas Menethil (former)", "Jaina Proudmoore", "Uther the Lightbringer", "Medivh"],
    units: [
      { name: "Footman", type: "Melee" },
      { name: "Rifleman", type: "Ranged" },
      { name: "Knight", type: "Cavalry" },
      { name: "Priest", type: "Caster" },
      { name: "Sorceress", type: "Caster" },
      { name: "Gryphon Rider", type: "Air" },
      { name: "Siege Engine", type: "Siege" },
      { name: "Spell Breaker", type: "Anti-Caster" },
    ],
    strengths: ["Strong defensive capabilities", "Versatile unit roster", "Powerful healing magic", "Well-rounded heroes"],
    image: "https://art.hearthstonejson.com/v1/orig/HERO_08.png",
    icon: "🛡️",
  },
  {
    id: "horde",
    name: "Horde",
    subtitle: "The Savage Warriors",
    color: "#c41e3a",
    gradient: "linear-gradient(135deg, #6e1a1a 0%, #c41e3a 100%)",
    description:
      "The New Horde, freed from demonic corruption by Thrall, seeks to carve out a new destiny on the harsh lands of Kalimdor while rediscovering their shamanistic heritage.",
    lore: "Once enslaved by the Burning Legion's demonic blood curse, the orcs were turned into mindless instruments of destruction. After their defeat in the Second War, the orcs were placed in internment camps. Thrall, raised as a slave gladiator, escaped and united the clans under the banner of the New Horde. He led them across the sea to Kalimdor, where they allied with the Darkspear Trolls and the mighty Tauren. On Kalimdor, Grom Hellscream sacrificed himself to slay the demon lord Mannoroth, freeing the orcs from their blood curse forever.",
    leaders: ["Thrall", "Grom Hellscream", "Cairne Bloodhoof", "Vol'jin"],
    units: [
      { name: "Grunt", type: "Melee" },
      { name: "Headhunter", type: "Ranged" },
      { name: "Raider", type: "Cavalry" },
      { name: "Shaman", type: "Caster" },
      { name: "Witch Doctor", type: "Caster" },
      { name: "Wind Rider", type: "Air" },
      { name: "Demolisher", type: "Siege" },
      { name: "Tauren Warrior", type: "Heavy Melee" },
    ],
    strengths: ["Raw combat power", "Strong melee units", "Powerful area damage", "Excellent siege capabilities"],
    image: "https://art.hearthstonejson.com/v1/orig/HERO_02.png",
    icon: "⚔️",
  },
  {
    id: "undead",
    name: "Undead Scourge",
    subtitle: "The Army of the Damned",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #2d1a4e 0%, #8b5cf6 100%)",
    description:
      "The Undead Scourge is the terrifying army of the dead, commanded by the Lich King from his Frozen Throne in Northrend. Their sole purpose is the eradication of all life on Azeroth.",
    lore: "Created by the Burning Legion as a weapon to weaken Azeroth's defenses before their invasion, the Scourge was formed when the demon lord Kil'jaeden transformed the orc shaman Ner'zhul into the Lich King. Imprisoned in the Frozen Throne atop Icecrown Glacier, the Lich King spread a plague of undeath across Lordaeron through his agent Kel'Thuzad. Prince Arthas, seeking to end the plague, was instead corrupted by the cursed runeblade Frostmourne and became the Lich King's greatest champion, eventually merging with him to become the new Lich King.",
    leaders: ["Arthas / The Lich King", "Kel'Thuzad", "Sylvanas Windrunner", "Anub'arak"],
    units: [
      { name: "Ghoul", type: "Melee" },
      { name: "Crypt Fiend", type: "Ranged" },
      { name: "Abomination", type: "Heavy Melee" },
      { name: "Necromancer", type: "Caster" },
      { name: "Banshee", type: "Caster" },
      { name: "Gargoyle", type: "Air" },
      { name: "Meat Wagon", type: "Siege" },
      { name: "Frost Wyrm", type: "Air/Siege" },
    ],
    strengths: ["Self-healing through combat", "Raising fallen enemies", "Powerful late-game units", "Blight terrain advantage"],
    image: "https://art.hearthstonejson.com/v1/orig/ICC_314.png",
    icon: "💀",
  },
  {
    id: "nightelf",
    name: "Night Elves",
    subtitle: "The Sentinels of Nature",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #0a3d2e 0%, #10b981 100%)",
    description:
      "The ancient Night Elves are the guardians of nature and the world tree Nordrassil. They have defended Kalimdor for over ten thousand years with the aid of the demigod Cenarius and the forces of nature.",
    lore: "The Night Elves, or Kaldorei, are one of the oldest races on Azeroth. Ten thousand years ago, their reckless use of arcane magic drew the attention of the Burning Legion, leading to the War of the Ancients. Malfurion Stormrage, Tyrande Whisperwind, and Illidan Stormrage were pivotal in that war. After the Sundering that split the continents, the Night Elves forsook arcane magic and embraced druidism. They planted the World Tree Nordrassil to safeguard the Well of Eternity's remnants. For millennia they lived in isolation until the Third War forced them to ally with the younger races to defeat the Burning Legion at Mount Hyjal.",
    leaders: ["Tyrande Whisperwind", "Malfurion Stormrage", "Illidan Stormrage", "Cenarius"],
    units: [
      { name: "Archer", type: "Ranged" },
      { name: "Huntress", type: "Cavalry" },
      { name: "Dryad", type: "Anti-Caster" },
      { name: "Druid of the Claw", type: "Melee/Caster" },
      { name: "Druid of the Talon", type: "Air/Caster" },
      { name: "Hippogryph", type: "Air" },
      { name: "Mountain Giant", type: "Heavy Melee" },
      { name: "Chimera", type: "Air/Siege" },
    ],
    strengths: ["Night combat bonuses", "Mobile buildings (Ancients)", "Powerful nature magic", "Stealth and ambush tactics"],
    image: "https://art.hearthstonejson.com/v1/orig/HERO_06.png",
    icon: "🌙",
  },
];
