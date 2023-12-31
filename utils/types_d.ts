type BuildLike = {
  id: number;
  user: string;
  build: number;
};

declare interface Weapon {
  id: number;
  name: string;
  image: string;
  stats: string;
}

declare interface Skill {
  id: number;
  description: string;
  name: string;
  tags: string;
  image: string;
  cooldown: number;
}

declare interface Character {
  id: number | null;
  name: string;
  description: string;
  image: string;
  tags: string;
  weapons: any[];
}

declare interface Rune {
  id: number;
  name: string;
  description: string;
  image: string;
  type: "versatility" | "tenacity";
  rarity: "uncommon" | "rare" | "epic" | "legendary";
}

declare interface BuildData {
  id: number;
  name: string;
  description: string;
  weapon: Weapon;
  skills: { skill: Skill; position: number }[];
  character: Character;
  created_at: string;
  profile: {
    id: number;
    username: string;
  };
  user: string;
  likes: BuildLike[];
  runes: { rune: Rune }[];
}
