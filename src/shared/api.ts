import { Puzzle, PuzzleStats, LeaderboardEntry } from '../client/types';

export type UpdateStatsRequest = {
  type: 'attempt' | 'solve';
};

export type StatsResponse = {
  stats: PuzzleStats;
};

export type SubmitScoreRequest = {
  name: string;
  score: number;
  level: number;
};

export type LeaderboardResponse = {
  entries: LeaderboardEntry[];
};


export type InitResponse = {
  type: 'init';
  postId: string;
  username: string;
  puzzle?: Puzzle;
  stats?: PuzzleStats;
};


export type CreatePuzzleRequest = {
  puzzle: Puzzle;
};

export type CreatePuzzleResponse = {
  postId: string;
  url: string;
};

export type IncrementResponse = {
  type: 'increment';
  postId: string;
  count: number;
};

export type DecrementResponse = {
  type: 'decrement';
  postId: string;
  count: number;
};
