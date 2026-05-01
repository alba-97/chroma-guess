export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export type Difficulty = "easy" | "medium" | "hard";

export interface GameState {
  colors: RGBColor[];
  targetIndex: number;
  difficulty: Difficulty;
  score: number;
  streak: number;
  bestStreak: number;
  gamesPlayed: number;
  gamesWon: number;
  isGameOver: boolean;
  message: string;
  messageType: "neutral" | "success" | "error";
  revealed: boolean[];
}

export interface GameStats {
  score: number;
  streak: number;
  bestStreak: number;
  accuracy: number;
}

export const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { squares: number; bonus: number }
> = {
  easy: { squares: 3, bonus: 10 },
  medium: { squares: 6, bonus: 25 },
  hard: { squares: 9, bonus: 50 },
};
