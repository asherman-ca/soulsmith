declare interface Weapon {
  id: number;
  name: string;
  image: string;
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
