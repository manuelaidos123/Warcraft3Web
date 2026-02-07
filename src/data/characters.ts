export interface Character {
  id: number;
  name: string;
  title: string;
  faction: string;
  role: string;
  description: string;
  image: string;
  abilities: string[];
}

export const characters: Character[] = [
  {
    id: 1,
    name: "Arthas Menethil",
    title: "The Lich King",
    faction: "undead",
    role: "villain",
    description:
      "Once the Crown Prince of Lordaeron, Arthas was corrupted by the cursed blade Frostmourne. He became a Death Knight and eventually merged with the Lich King, becoming the supreme ruler of the Undead Scourge.",
    image: "https://art.hearthstonejson.com/v1/orig/ICC_314.png",
    abilities: ["Death Coil", "Death Pact", "Unholy Aura", "Animate Dead"],
  },
  {
    id: 2,
    name: "Thrall",
    title: "Warchief of the Horde",
    faction: "horde",
    role: "hero",
    description:
      "Born as Go'el, Thrall was raised as a slave gladiator by humans. He escaped captivity, united the scattered orc clans, and led the Horde to a new homeland in Kalimdor, forging alliances to save Azeroth.",
    image: "https://art.hearthstonejson.com/v1/orig/HERO_02.png",
    abilities: ["Chain Lightning", "Far Sight", "Feral Spirit", "Earthquake"],
  },
  {
    id: 3,
    name: "Jaina Proudmoore",
    title: "Archmage of the Kirin Tor",
    faction: "alliance",
    role: "hero",
    description:
      "A powerful human sorceress and the leader of the Kirin Tor. Jaina played a pivotal role in forging an alliance between humans, orcs, and night elves to defeat the Burning Legion at the Battle of Mount Hyjal.",
    image: "https://art.hearthstonejson.com/v1/orig/HERO_08.png",
    abilities: ["Blizzard", "Summon Water Elemental", "Brilliance Aura", "Mass Teleport"],
  },
  {
    id: 4,
    name: "Tyrande Whisperwind",
    title: "High Priestess of Elune",
    faction: "nightelf",
    role: "hero",
    description:
      "The chosen high priestess of the goddess Elune and leader of the Night Elves. Tyrande has defended Kalimdor for over ten thousand years and played a crucial role in the Third War against the Burning Legion.",
    image: "https://art.hearthstonejson.com/v1/orig/HERO_09a.png",
    abilities: ["Scout", "Searing Arrows", "Trueshot Aura", "Starfall"],
  },
  {
    id: 5,
    name: "Uther the Lightbringer",
    title: "The First Paladin",
    faction: "alliance",
    role: "support",
    description:
      "The first of the Knights of the Silver Hand and Arthas' mentor. Uther was a beacon of righteousness and justice who ultimately fell at the hands of his own pupil during the Scourge invasion of Lordaeron.",
    image: "https://art.hearthstonejson.com/v1/orig/HERO_04.png",
    abilities: ["Holy Light", "Divine Shield", "Devotion Aura", "Resurrection"],
  },
  {
    id: 6,
    name: "Sylvanas Windrunner",
    title: "The Banshee Queen",
    faction: "undead",
    role: "villain",
    description:
      "Once the Ranger-General of Silvermoon, Sylvanas was slain by Arthas and raised as a banshee. She broke free from the Lich King's control and became the leader of the Forsaken, seeking vengeance against the Scourge.",
    image: "https://art.hearthstonejson.com/v1/orig/EX1_016.png",
    abilities: ["Black Arrow", "Silence", "Charm", "Possession"],
  },
  {
    id: 7,
    name: "Malfurion Stormrage",
    title: "The First Druid",
    faction: "nightelf",
    role: "hero",
    description:
      "The first mortal druid on Azeroth, trained by the demigod Cenarius. Malfurion has defended the world from the Burning Legion multiple times and is one of the most powerful beings in Azeroth's history.",
    image: "https://art.hearthstonejson.com/v1/orig/HERO_06.png",
    abilities: ["Entangling Roots", "Force of Nature", "Thorns Aura", "Tranquility"],
  },
  {
    id: 8,
    name: "Grom Hellscream",
    title: "Chieftain of the Warsong Clan",
    faction: "horde",
    role: "hero",
    description:
      "The fierce chieftain of the Warsong Clan, Grom was the first orc to drink the Blood of Mannoroth. He ultimately redeemed himself by slaying Mannoroth, freeing the orcs from their demonic curse at the cost of his own life.",
    image: "https://art.hearthstonejson.com/v1/orig/EX1_414.png",
    abilities: ["Wind Walk", "Mirror Image", "Critical Strike", "Bladestorm"],
  },
  {
    id: 9,
    name: "Kel'Thuzad",
    title: "Archlich of Naxxramas",
    faction: "undead",
    role: "villain",
    description:
      "A former mage of the Kirin Tor who became fascinated with necromancy. Kel'Thuzad founded the Cult of the Damned and served as one of the Lich King's most powerful and loyal agents.",
    image: "https://art.hearthstonejson.com/v1/orig/FP1_013.png",
    abilities: ["Frost Nova", "Frost Armor", "Dark Ritual", "Death and Decay"],
  },
  {
    id: 10,
    name: "Cairne Bloodhoof",
    title: "High Chieftain of the Tauren",
    faction: "horde",
    role: "support",
    description:
      "The wise and venerable leader of the united Tauren tribes. Cairne allied with Thrall and the Horde, leading his people to the plains of Mulgore and founding the great city of Thunder Bluff.",
    image: "https://art.hearthstonejson.com/v1/orig/EX1_110.png",
    abilities: ["Shockwave", "War Stomp", "Endurance Aura", "Reincarnation"],
  },
  {
    id: 11,
    name: "Illidan Stormrage",
    title: "The Betrayer",
    faction: "nightelf",
    role: "villain",
    description:
      "Malfurion's twin brother who was imprisoned for ten thousand years for his reckless use of arcane magic. Freed during the Third War, Illidan consumed the Skull of Gul'dan and became a demon hunter of immense power.",
    image: "https://art.hearthstonejson.com/v1/orig/EX1_614.png",
    abilities: ["Mana Burn", "Immolation", "Evasion", "Metamorphosis"],
  },
  {
    id: 12,
    name: "Medivh",
    title: "The Last Guardian",
    faction: "alliance",
    role: "support",
    description:
      "The last Guardian of Tirisfal, Medivh was possessed by the dark titan Sargeras. After his death and resurrection, he worked to unite the races of Azeroth against the Burning Legion's third invasion.",
    image: "https://art.hearthstonejson.com/v1/orig/HERO_08a.png",
    abilities: ["Raven Form", "Arcane Brilliance", "Polymorph", "Guardian's Sight"],
  },
];

export const factionColors: Record<string, string> = {
  alliance: "#2f89fc",
  horde: "#c41e3a",
  undead: "#8b5cf6",
  nightelf: "#10b981",
};

export const factionNames: Record<string, string> = {
  alliance: "Alliance",
  horde: "Horde",
  undead: "Undead Scourge",
  nightelf: "Night Elves",
};

export const factionGradients: Record<string, string> = {
  alliance: "linear-gradient(135deg, #1a3a6e 0%, #2f89fc 100%)",
  horde: "linear-gradient(135deg, #6e1a1a 0%, #c41e3a 100%)",
  undead: "linear-gradient(135deg, #2d1a4e 0%, #8b5cf6 100%)",
  nightelf: "linear-gradient(135deg, #0a3d2e 0%, #10b981 100%)",
};

export const roleLabels: Record<string, { label: string; color: string }> = {
  hero: { label: "Hero", color: "#2563eb" },
  villain: { label: "Villain", color: "#dc2626" },
  support: { label: "Support", color: "#059669" },
};
