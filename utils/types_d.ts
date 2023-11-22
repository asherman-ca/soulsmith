declare interface Skill {
  id: number;
  description: string;
  name: string;
  tags: string;
  image: string;
}

declare interface Character {
  id: number;
  name: string;
  description: string;
  image: string;
  // skills: Skill[];
}
