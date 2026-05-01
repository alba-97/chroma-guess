import { RGBColor, DIFFICULTY_CONFIG, type Difficulty } from "../types/game";

export function generateRandomColor(): RGBColor {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

export function rgbToString(color: RGBColor): string {
  return `RGB(${color.r}, ${color.g}, ${color.b})`;
}

export function rgbToHex(color: RGBColor): string {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`.toUpperCase();
}

export function generateColorsForGame(difficulty: Difficulty): {
  colors: RGBColor[];
  targetIndex: number;
} {
  const { squares } = DIFFICULTY_CONFIG[difficulty];
  const colors: RGBColor[] = [];

  for (let i = 0; i < squares; i++) {
    colors.push(generateRandomColor());
  }

  const targetIndex = Math.floor(Math.random() * squares);
  return { colors, targetIndex };
}

export function ensureDistinctColors(
  colors: RGBColor[],
  minDistance: number = 80,
): RGBColor[] {
  const colorDistance = (c1: RGBColor, c2: RGBColor): number => {
    return Math.sqrt(
      Math.pow(c1.r - c2.r, 2) +
        Math.pow(c1.g - c2.g, 2) +
        Math.pow(c1.b - c2.b, 2),
    );
  };

  const result: RGBColor[] = [];

  for (const color of colors) {
    let attempts = 0;
    let validColor = color;

    while (attempts < 50) {
      let tooSimilar = false;
      for (const existing of result) {
        if (colorDistance(validColor, existing) < minDistance) {
          tooSimilar = true;
          break;
        }
      }

      if (!tooSimilar || result.length === 0) {
        break;
      }

      validColor = generateRandomColor();
      attempts++;
    }

    result.push(validColor);
  }

  return result;
}
