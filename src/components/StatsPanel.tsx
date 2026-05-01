import { motion } from "framer-motion";
import { Trophy, Flame, Target, BarChart3, Sparkles } from "lucide-react";

interface StatsPanelProps {
  score: number;
  streak: number;
  bestStreak: number;
  accuracy: number;
  highScore: number;
  onReset: () => void;
}

export function StatsPanel({
  score,
  streak,
  bestStreak,
  accuracy,
  highScore,
  onReset,
}: StatsPanelProps) {
  const stats = [
    {
      icon: Trophy,
      label: "Score",
      value: score.toLocaleString(),
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: Flame,
      label: "Streak",
      value: streak,
      color: "text-error",
      bgColor: "bg-error/10",
    },
    {
      icon: Sparkles,
      label: "Best Streak",
      value: bestStreak,
      color: "text-accent-glow",
      bgColor: "bg-accent-primary/10",
    },
    {
      icon: Target,
      label: "Accuracy",
      value: `${accuracy}%`,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {score > 0 && score === highScore && score > 100 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel rounded-xl p-4 mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-warning" />
            <span className="text-lg font-bold text-warning">
              New High Score!
            </span>
            <Trophy className="w-6 h-6 text-warning" />
          </div>
          <p className="text-white/60 text-sm mt-1">
            Highest Score: {highScore.toLocaleString()} pts
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
          >
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className="text-2xl font-bold text-white">{stat.value}</span>
            <span className="text-xs text-white/50 uppercase tracking-wider">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onReset}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full py-3 text-white/40 hover:text-white/60 text-sm
                   transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <BarChart3 className="w-4 h-4" />
        Reset Statistics
      </motion.button>
    </div>
  );
}
