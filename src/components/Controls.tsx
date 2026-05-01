import { motion, AnimatePresence } from "framer-motion";
import type { Difficulty } from "../types/game";
import { DIFFICULTY_CONFIG } from "../types/game";
import { RotateCcw, Trophy, Target } from "lucide-react";

interface ControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (diff: Difficulty) => void;
  onReset: () => void;
  message: string;
  messageType: "neutral" | "success" | "error";
  isGameOver: boolean;
}

export function Controls({
  difficulty,
  onDifficultyChange,
  onReset,
  message,
  messageType,
  isGameOver,
}: ControlsProps) {
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];
  const labels: Record<Difficulty, string> = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-center gap-2 mb-6">
        {difficulties.map((diff) => (
          <motion.button
            key={diff}
            onClick={() => onDifficultyChange(diff)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 rounded-xl font-medium text-sm sm:text-base transition-all duration-300
              ${
                difficulty === diff
                  ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/30"
                  : "bg-dark-elevated text-white/60 hover:text-white hover:bg-dark-elevated/80"
              }
            `}
          >
            {labels[diff]}
            <span className="ml-2 text-xs opacity-60">
              {DIFFICULTY_CONFIG[diff].squares}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-center mb-6"
          >
            <span
              className={`
                inline-block px-6 py-3 rounded-xl font-semibold text-lg
                ${
                  messageType === "success"
                    ? "bg-success/20 text-success border border-success/30"
                    : messageType === "error"
                      ? "bg-error/20 text-error border border-error/30"
                      : "bg-dark-elevated text-white/80"
                }
              `}
            >
              {messageType === "success" && (
                <Trophy className="inline w-5 h-5 mr-2" />
              )}
              {messageType === "error" && (
                <Target className="inline w-5 h-5 mr-2" />
              )}
              {message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            btn-primary flex items-center gap-2 text-base sm:text-lg
            ${isGameOver ? "animate-pulse-glow" : ""}
          `}
        >
          <RotateCcw className="w-5 h-5" />
          {isGameOver ? "Play Again" : "New Colors"}
        </motion.button>
      </motion.div>
    </div>
  );
}
