import { Header } from "./components/Header";
import { GameBoard } from "./components/GameBoard";
import { Controls } from "./components/Controls";
import { StatsPanel } from "./components/StatsPanel";
import { useGame } from "./hooks/useGame";
import { motion } from "framer-motion";
import { HelpCircle, X } from "lucide-react";
import { useState } from "react";

function App() {
  const {
    state,
    setDifficulty,
    handleGuess,
    resetGame,
    resetStats,
    accuracy,
    highScore,
  } = useGame();

  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowHelp(true)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full glass-panel
                   hover:bg-dark-elevated transition-colors duration-300"
      >
        <HelpCircle className="w-5 h-5 text-white/70" />
      </motion.button>

      {showHelp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowHelp(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-panel rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">How to Play</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>
            <div className="space-y-3 text-white/80 text-sm">
              <p>1. Look at the RGB code displayed at the top.</p>
              <p>2. Click on the color square that matches that code.</p>
              <p>3. Correct guesses increase your streak and points!</p>
              <p>4. Wrong guesses reset your streak to 0.</p>
              <p>5. Higher difficulty = more points.</p>
              <p className="text-accent-glow mt-4">Good luck!</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Header
        targetColor={state.colors[state.targetIndex]}
        isGameOver={state.isGameOver}
        isCorrect={state.messageType === "success"}
      />

      <main className="flex-1 flex flex-col">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="py-6 sm:py-8"
        >
          <GameBoard state={state} onGuess={handleGuess} />
        </motion.section>

        <Controls
          difficulty={state.difficulty}
          onDifficultyChange={setDifficulty}
          onReset={resetGame}
          message={state.message}
          messageType={state.messageType}
          isGameOver={state.isGameOver}
        />

        <StatsPanel
          score={state.score}
          streak={state.streak}
          bestStreak={state.bestStreak}
          accuracy={accuracy}
          highScore={highScore}
          onReset={resetStats}
        />
      </main>

      <footer className="py-4 text-center text-white/30 text-xs">
        <p>Chroma Guess • RGB Color Guessing Game</p>
      </footer>
    </div>
  );
}

export default App;
