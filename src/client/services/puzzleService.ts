
import { Puzzle } from "../types";
import { puzzles } from "../data/puzzleData";

export async function getPuzzle(level: number): Promise<Puzzle | null> {
  // Level is 1-indexed, array is 0-indexed
  const index = level - 1;
  
  if (index >= puzzles.length) {
    return null; // End of game
  }

  const puzzleData = puzzles[index];
  
  // Artificial delay to simulate "loading" and maintain the app's smooth transitions
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    ...puzzleData,
    id: `level-${level}`,
    level: level
  };
}
