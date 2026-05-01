import { useState, useCallback, useEffect } from "react";
import type { GameState, Difficulty } from "../types/game";
import { DIFFICULTY_CONFIG } from "../types/game";
import { generateColorsForGame, ensureDistinctColors } from "../utils/colors";

const STORAGE_KEY = "chroma-guess-stats";

interface PersistedStats {
  bestStreak: number;
  gamesPlayed: number;
  gamesWon: number;
  highScore: number;
}

const initialStats: PersistedStats = {
  bestStreak: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  highScore: 0,
};

function loadStats(): PersistedStats {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialStats, ...JSON.parse(saved) } : initialStats;
  } catch {
    return initialStats;
  }
}

function saveStats(stats: PersistedStats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

export function useGame() {
  const [stats, setStats] = useState<PersistedStats>(loadStats);
  const [state, setState] = useState<GameState>(() => {
    const { colors, targetIndex } = generateColorsForGame("easy");
    return {
      colors: ensureDistinctColors(colors),
      targetIndex,
      difficulty: "easy",
      score: 0,
      streak: 0,
      bestStreak: stats.bestStreak,
      gamesPlayed: stats.gamesPlayed,
      gamesWon: stats.gamesWon,
      isGameOver: false,
      message: "",
      messageType: "neutral",
      revealed: Array(3).fill(false),
    };
  });

  useEffect(() => {
    saveStats({
      bestStreak: Math.max(stats.bestStreak, state.streak),
      gamesPlayed: state.gamesPlayed,
      gamesWon: state.gamesWon,
      highScore: Math.max(stats.highScore, state.score),
    });
  }, [state.streak, state.gamesPlayed, state.gamesWon, state.score, stats]);

  const generateNewGame = useCallback(
    (difficulty: Difficulty = state.difficulty) => {
      const { squares } = DIFFICULTY_CONFIG[difficulty];
      const { colors, targetIndex } = generateColorsForGame(difficulty);

      setState((prev: GameState) => ({
        ...prev,
        colors: ensureDistinctColors(colors, difficulty === "hard" ? 60 : 80),
        targetIndex,
        difficulty,
        isGameOver: false,
        message: "",
        messageType: "neutral",
        revealed: Array(squares).fill(false),
      }));
    },
    [state.difficulty],
  );

  const setDifficulty = useCallback(
    (difficulty: Difficulty) => {
      generateNewGame(difficulty);
    },
    [generateNewGame],
  );

  const handleGuess = useCallback(
    (index: number) => {
      if (state.isGameOver || state.revealed[index]) return;

      const isCorrect = index === state.targetIndex;
      const { bonus } = DIFFICULTY_CONFIG[state.difficulty];

      if (isCorrect) {
        const newStreak = state.streak + 1;
        const streakBonus = Math.min(newStreak * 5, 50);
        const points = bonus + streakBonus;

        setState((prev: GameState) => ({
          ...prev,
          score: prev.score + points,
          streak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
          isGameOver: true,
          message: `Correct! +${points} pts`,
          messageType: "success",
          revealed: prev.colors.map(
            (_: unknown, i: number) =>
              i === prev.targetIndex || prev.revealed[i],
          ),
          gamesPlayed: prev.gamesPlayed + 1,
          gamesWon: prev.gamesWon + 1,
        }));
      } else {
        setState((prev: GameState) => ({
          ...prev,
          streak: 0,
          isGameOver: true,
          message: "Wrong! Try again",
          messageType: "error",
          revealed: prev.revealed.map((r: boolean, i: number) =>
            i === index ? true : r,
          ),
          gamesPlayed: prev.gamesPlayed + 1,
        }));
      }
    },
    [
      state.difficulty,
      state.isGameOver,
      state.revealed,
      state.streak,
      state.targetIndex,
    ],
  );

  const resetGame = useCallback(() => {
    generateNewGame(state.difficulty);
  }, [generateNewGame, state.difficulty]);

  const resetStats = useCallback(() => {
    setStats(initialStats);
    setState((prev: GameState) => ({
      ...prev,
      score: 0,
      streak: 0,
      bestStreak: 0,
      gamesPlayed: 0,
      gamesWon: 0,
    }));
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const accuracy =
    state.gamesPlayed > 0
      ? Math.round((state.gamesWon / state.gamesPlayed) * 100)
      : 0;

  return {
    state,
    setDifficulty,
    handleGuess,
    resetGame,
    resetStats,
    accuracy,
    highScore: Math.max(stats.highScore, state.score),
  };
}
