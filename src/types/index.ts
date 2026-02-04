export type Screen = 'login' | 'onboarding' | 'camera' | 'analyzing' | 'dashboard' | 'health' | 'smart-home' | 'community' | 'supplies';

export interface PetProfile {
  name: string;
  breed: string;
  type: 'dog' | 'cat';
  age: string;
  imageUrl: string;
}

export interface BreedData {
  communication: string;
  training: string;
  healthIssues: string[];
  healthTips: string;
  recipe: string;
  walks: string;
  season: string;
  cameraTip: string;
}

export interface Camera {
  id: number;
  name: string;
  status: 'online' | 'offline';
  type: string;
  streamUrl?: string;
}

export interface Vet {
  id: number;
  name: string;
  distance: string;
  rating: number;
  imageUrl: string;
}

export interface Playdate {
  id: number;
  title: string;
  date: string;
  month: string;
  day: string;
  time: string;
  petsAttending: number;
}

export interface Supply {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}
