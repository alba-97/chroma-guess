# Chroma Guess

An RGB color guessing game.

<img width="750" height="598" alt="image" src="https://github.com/user-attachments/assets/6cfa1993-c9de-4e33-8e39-ffdc4de844c7" />

## Features

- **Premium Design**: Modern dark interface with glassmorphism effects
- **Smooth Animations**: Fluid transitions with Framer Motion
- **3 Difficulty Levels**:
  - Easy: 3 colors
  - Medium: 6 colors
  - Hard: 9 colors
- **Scoring System**: Base points + streak bonus
- **Persistent Statistics**: Saved in localStorage
- **Visual Feedback**: Glow, pulse, and celebration effects
- **Responsive**: Works on desktop and mobile

## Technologies

- **React 18** + TypeScript
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Lucide React** (icons)

## How to Play

1. Look at the RGB code displayed at the top (e.g., RGB(123, 45, 67))
2. Click on the color square that matches that code
3. Correct guesses increase your streak and points!
4. Wrong guesses reset your streak to 0
5. Higher difficulty = more points

## Installation

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ColorSquare.tsx    # Interactive color square
│   ├── GameBoard.tsx      # Color grid
│   ├── Header.tsx         # Header with target color
│   ├── Controls.tsx       # Controls and messages
│   └── StatsPanel.tsx     # Statistics panel
├── hooks/
│   └── useGame.ts         # Game logic
├── types/
│   └── game.ts            # TypeScript types
├── utils/
│   └── colors.ts          # Color utilities
├── App.tsx                # Main component
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## Credits

Redesign of "The Great RGB Guessing Game".
