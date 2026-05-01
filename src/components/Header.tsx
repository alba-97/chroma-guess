import { motion } from "framer-motion";
import type { RGBColor } from "../types/game";
import { rgbToString } from "../utils/colors";
import { Sparkles, Palette } from "lucide-react";

interface HeaderProps {
  targetColor: RGBColor;
  isGameOver: boolean;
  isCorrect: boolean;
}

export function Header({ targetColor, isGameOver, isCorrect }: HeaderProps) {
  const displayColor = rgbToString(targetColor);
  const bgColor =
    isGameOver && isCorrect
      ? `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`
      : undefined;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full py-8 sm:py-12 px-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="flex items-center justify-center gap-2 mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <Palette className="w-8 h-8 text-accent-glow" />
            <Sparkles className="w-4 h-4 text-warning absolute -top-1 -right-1" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            <span className="text-white">Chroma</span>
            <span className="text-accent-primary">Guess</span>
          </h1>
        </motion.div>

        <motion.div
          className="relative inline-block"
          animate={{
            scale: isGameOver && isCorrect ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-panel px-6 sm:px-10 py-4 sm:py-6 rounded-2xl">
            <p className="text-white/60 text-sm sm:text-base uppercase tracking-widest mb-2">
              Guess the color
            </p>
            <motion.h2
              key={displayColor}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono tracking-wide"
              style={{
                textShadow: "0 0 40px rgba(99, 102, 241, 0.5)",
              }}
            >
              {displayColor}
            </motion.h2>
          </div>

          <motion.div
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-12 bg-accent-primary rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-12 bg-accent-glow rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </div>
    </motion.header>
  );
}
