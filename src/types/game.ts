export type GameType = 'regular' | 'postage' | 'picture-frame' | 'blackout';

export interface Player {
  id: string;
  name: string;
  card: number[][];
}

export interface Game {
  id: string;
  type: GameType;
  host: string;
  players: Player[];
  calledNumbers: number[];
  status: 'lobby' | 'playing' | 'finished';
}