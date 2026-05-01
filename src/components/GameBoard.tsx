import { motion } from "framer-motion";
import { ColorSquare } from "./ColorSquare";
import type { GameState } from "../types/game";

interface GameBoardProps {
  state: GameState;
  onGuess: (index: number) => void;
}

export function GameBoard({ state, onGuess }: GameBoardProps) {
  const { colors, targetIndex, isGameOver, revealed, difficulty } = state;

  const gridConfig = {
    easy: "grid-cols-3 max-w-md",
    medium: "grid-cols-3 max-w-xl",
    hard: "grid-cols-3 max-w-2xl",
  };

  return (
    <div className="w-full flex justify-center px-4">
      <motion.div
        layout
        className={`grid ${gridConfig[difficulty]} gap-4 sm:gap-6`}
      >
        {colors.map((color, index) => (
          <ColorSquare
            key={`${color.r}-${color.g}-${color.b}-${index}`}
            color={color}
            index={index}
            isRevealed={revealed[index]}
            isTarget={index === targetIndex}
            isGameOver={isGameOver}
            onClick={() => onGuess(index)}
          />
        ))}
      </motion.div>
    </div>
  );
}
