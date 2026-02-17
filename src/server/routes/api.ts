import { Hono } from 'hono';
import { context, redis, reddit } from '@devvit/web/server';
import type {
  CreatePuzzleRequest,
  CreatePuzzleResponse,
  DecrementResponse,
  IncrementResponse,
  InitResponse,
} from '../../shared/api';

type ErrorResponse = {
  status: 'error';
  message: string;
};

export const api = new Hono();
const DIFFICULTY_LABELS = {
  1: 'Beginner',
  2: 'Apprentice',
  3: 'Expert',
  4: 'Master',
  5: 'Legend',
};
api.get('/init', async (c) => {
  const { postId } = context;

  if (!postId) {
    console.error('API Init Error: postId not found in devvit context');
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: 'postId is required but missing from context',
      },
      400
    );
  }

  try {
    const [count, username, puzzleData] = await Promise.all([
      redis.get('count'),
      reddit.getCurrentUsername(),
      redis.get(`puzzle:${postId}`),
    ]);

    return c.json<InitResponse>({
      type: 'init',
      postId: postId,
      count: count ? parseInt(count) : 0,
      username: username ?? 'anonymous',
      puzzle: puzzleData ? JSON.parse(puzzleData) : undefined,
    });
  } catch (error) {
    console.error(`API Init Error for post ${postId}:`, error);
    let errorMessage = 'Unknown error during initialization';
    if (error instanceof Error) {
      errorMessage = `Initialization failed: ${error.message}`;
    }
    return c.json<ErrorResponse>(
      { status: 'error', message: errorMessage },
      400
    );
  }
});

api.post('/increment', async (c) => {
  const { postId } = context;
  if (!postId) {
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: 'postId is required',
      },
      400
    );
  }

  const count = await redis.incrBy('count', 1);
  return c.json<IncrementResponse>({
    count,
    postId,
    type: 'increment',
  });
});

api.post('/decrement', async (c) => {
  const { postId } = context;
  if (!postId) {
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: 'postId is required',
      },
      400
    );
  }

  const count = await redis.incrBy('count', -1);
  return c.json<DecrementResponse>({
    count,
    postId,
    type: 'decrement',
  });
});

api.post('/create-puzzle', async (c) => {
  try {
    const { puzzle } = await c.req.json<CreatePuzzleRequest>();

    if (!puzzle) {
      return c.json<ErrorResponse>({ status: 'error', message: 'Puzzle data is required' }, 400);
    }

    const { subredditName } = context;
    if (!subredditName) {
      return c.json<ErrorResponse>({ status: 'error', message: 'Subreddit name not found' }, 400);
    }

    // 1. Create the Reddit post
    const post = await reddit.submitCustomPost({
      title: `Can you solve this ${DIFFICULTY_LABELS[puzzle.difficulty]} level puzzle that u/${context.username} created?`,
      subredditName,
    });

    // 2. Store the puzzle data in Redis using the new postId
    // We prefix with 'puzzle:' to avoid collisions with other data
    await redis.set(`puzzle:${post.id}`, JSON.stringify(puzzle));

    return c.json<CreatePuzzleResponse>({
      postId: post.id,
      url: `https://reddit.com/r/${subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error('Create Puzzle Error:', error);
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to create puzzle',
      },
      500
    );
  }
});
