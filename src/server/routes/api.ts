import { Hono } from 'hono';
import { context, redis, reddit } from '@devvit/web/server';
import type {
  CreatePuzzleRequest,
  CreatePuzzleResponse,
  InitResponse,
  UpdateStatsRequest,
  StatsResponse,
  SubmitScoreRequest,
  LeaderboardResponse,
} from '../../shared/api';
import { LeaderboardEntry } from '../../client/types';



type ErrorResponse = {
  status: 'error';
  message: string;
};

export const api = new Hono();
const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Beginner',
  2: 'Apprentice',
  3: 'Expert',
  4: 'Master',
  5: 'Legend',
};
api.get('/init', async (c) => {
  const { postId, username } = context;

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
    const puzzleData = await redis.get(`puzzle:${postId}`);

    // Fetch stats if puzzle exists
    let stats;
    if (puzzleData) {
      const globalAttemptsKey = `stats:global:attempts:${postId}`;
      const globalSolvedKey = `stats:global:solved:${postId}`;
      const userAttemptsKey = `stats:user:attempts:${postId}:${username}`;
      const userSolvedKey = `stats:user:solved:${postId}:${username}`;

      const [gAttempts, gSolved, uAttempts, uSolved] = await Promise.all([
        redis.get(globalAttemptsKey),
        redis.get(globalSolvedKey),
        redis.get(userAttemptsKey),
        redis.get(userSolvedKey),
      ]);

      stats = {
        globalAttempts: gAttempts ? parseInt(gAttempts) : 0,
        globalSolved: gSolved ? parseInt(gSolved) : 0,
        userAttempts: uAttempts ? parseInt(uAttempts) : 0,
        userSolved: uSolved ? parseInt(uSolved) : 0,
      };
    }

    return c.json<InitResponse>({
      type: 'init',
      postId: postId,
      username: username ?? 'anonymous',
      puzzle: puzzleData ? JSON.parse(puzzleData) : undefined,
      stats,
    });
  } catch (error) {
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

    // 3. Add instructions comment
    await reddit.submitComment({
      id: post.id,
      text: `Welcome to **Symbologik**! 🧩\n\n**How to Play:**\n1. Analyze the **Clues** to deduce the hidden numerical value of each symbol.\n2. Apply those values to the **Challenge Matrix**.\n3. Enter the final result to stabilize the matrix!\n\n**Scoring Warning:**\n⚠️ Every **failed attempt** reduces your potential points for this challenge. Precision is key!\n\nGood luck, Architect.`,
    });


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

api.post('/stats', async (c) => {
  try {
    const { type } = await c.req.json<UpdateStatsRequest>();
    const { username, postId } = context;

    if (!type) {
      return c.json<ErrorResponse>({ status: 'error', message: 'type is required' }, 400);
    }

    const globalAttemptsKey = `stats:global:attempts:${postId}`;
    const globalSolvedKey = `stats:global:solved:${postId}`;
    const userAttemptsKey = `stats:user:attempts:${postId}:${username}`;
    const userSolvedKey = `stats:user:solved:${postId}:${username}`;

    if (type === 'attempt') {
      await Promise.all([
        redis.incrBy(globalAttemptsKey, 1),
        redis.incrBy(userAttemptsKey, 1),
      ]);
    } else if (type === 'solve') {
      await Promise.all([
        redis.incrBy(globalAttemptsKey, 1),
        redis.incrBy(userAttemptsKey, 1),
        redis.incrBy(globalSolvedKey, 1),
        redis.incrBy(userSolvedKey, 1),
      ]);
    }

    const [gAttempts, gSolved, uAttempts, uSolved] = await Promise.all([
      redis.get(globalAttemptsKey),
      redis.get(globalSolvedKey),
      redis.get(userAttemptsKey),
      redis.get(userSolvedKey),
    ]);


    return c.json<StatsResponse>({
      stats: {
        globalAttempts: gAttempts ? parseInt(gAttempts) : 0,
        globalSolved: gSolved ? parseInt(gSolved) : 0,
        userAttempts: uAttempts ? parseInt(uAttempts) : 0,
        userSolved: uSolved ? parseInt(uSolved) : 0,
      },
    });
  } catch (error) {
    console.error('Update Stats Error:', error);
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to update stats',
      },
      500
    );
  }
});

api.post('/score', async (c) => {
  try {
    const { score } = await c.req.json<SubmitScoreRequest>();
    const { username } = context;
    
    if (!score) {
      return c.json<ErrorResponse>({ status: 'error', message: 'score is required' }, 400);
    }

    const leaderboardKey = 'leaderboard:global';

    // Increment global score
    await redis.zIncrBy(leaderboardKey, username ?? 'unknown', score);
    

    return c.json({ status: 'success' });
  } catch (error) {
    console.error('Submit Score Error:', error);
    return c.json<ErrorResponse>({ status: 'error', message: 'Failed to submit score' }, 500);
  }
});

api.get('/leaderboard', async (c) => {
  try {
    const leaderboardKey = 'leaderboard:global';
    // Get top 10 members with scores
    const entries = await redis.zRange(leaderboardKey, 0, 9, { by: 'rank', reverse: true });
    
    const results: LeaderboardEntry[] = await Promise.all(
      entries.map(async (entry) => {
        console.log(entry, "entry");
        const name = entry.member;
        const score = entry.score;
        
        return {
          name,
          score,
        };
      })
    );

    return c.json<LeaderboardResponse>({ entries: results });
  } catch (error) {
    console.error('Get Leaderboard Error:', error);
    return c.json<ErrorResponse>({ status: 'error', message: 'Failed to fetch leaderboard' }, 500);
  }
});



