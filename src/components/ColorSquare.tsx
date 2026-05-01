import { motion } from "framer-motion";
import type { RGBColor } from "../types/game";

interface ColorSquareProps {
  color: RGBColor;
  index: number;
  isRevealed: boolean;
  isTarget: boolean;
  isGameOver: boolean;
  onClick: () => void;
  size?: "small" | "medium" | "large";
}

export function ColorSquare({
  color,
  index,
  isRevealed,
  isTarget,
  isGameOver,
  onClick,
  size = "medium",
}: ColorSquareProps) {
  const bgColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32",
    large: "w-32 h-32 sm:w-40 sm:h-40",
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isRevealed && !isTarget ? 0.8 : 1,
        opacity: isRevealed && !isTarget ? 0.3 : 1,
      }}
      whileHover={!isGameOver ? { scale: 1.08, y: -4 } : {}}
      whileTap={!isGameOver ? { scale: 0.95 } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: index * 0.05,
      }}
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        rounded-2xl cursor-pointer relative overflow-hidden
        shadow-lg shadow-black/20
        ${isGameOver ? "cursor-default" : "cursor-pointer"}
      `}
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow:
            isTarget && isGameOver
              ? "0 0 30px 10px rgba(255, 255, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)"
              : "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.3 }}
      />

      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {isTarget && isGameOver && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border-4 border-white/50 rounded-2xl"
            style={{ borderStyle: "dashed" }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
