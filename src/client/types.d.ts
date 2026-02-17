export interface EquationPart {
    type: 'symbol' | 'operator' | 'number';
    value: string | number;
}
export interface Equation {
    parts: EquationPart[];
    result?: number;
}
export interface Puzzle {
    id: string;
    name?: string;
    level: number;
    clues: Equation[];
    target: Equation;
    answer: number;
    explanation: string;
    symbols: Record<string, string>;
    difficulty: number;
    createdBy: string;
}
export interface PuzzleStats {
    globalAttempts: number;
    globalSolved: number;
    userAttempts: number;
    userSolved: number;
}
export interface LeaderboardEntry {
    name: string;
    score: number;
}
export interface GameState {
    currentLevel: number;
    score: number;
    puzzle: Puzzle | null;
    isLoading: boolean;
    status: 'welcome' | 'config' | 'library' | 'leaderboard' | 'challenges' | 'playing' | 'checking' | 'correct' | 'wrong' | 'gameover';
    userInput: string;
    attempts: number;
    solvedLevels: number[];
    lastPointsEarned: number;
    username?: string;
}
