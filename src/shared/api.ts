import { Puzzle } from '../client/types';

export type InitResponse = {
  type: 'init';
  postId: string;
  count: number;
  username: string;
  puzzle?: Puzzle;
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
