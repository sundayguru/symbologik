
import { useState, useEffect, useCallback } from 'react';
import { GameState, Puzzle, PuzzleStats } from '../types';

import { InitResponse, CreatePuzzleResponse, UpdateStatsRequest, StatsResponse, SubmitScoreRequest, LeaderboardResponse } from '../../shared/api';



export const useGameLogic = (creator?: boolean) => {
  const [state, setState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    puzzle: null,
    isLoading: true,
    status: creator ? 'config' : 'welcome',
    userInput: '',
    attempts: 0,
    solvedLevels: [],
    lastPointsEarned: 0,
    username: 'ARCHITECT'
  });

  const [globalStats, setGlobalStats] = useState<Record<string, PuzzleStats>>({});
  const [customPuzzles, setCustomPuzzles] = useState<Puzzle[]>([]);

  // Load persistence data and init from server on mount
  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetch('/api/init');
        const data: InitResponse = await response.json();
        
        if (data.puzzle) {

          setState(prev => ({
            ...prev,
            puzzle: data.puzzle!,
            status: 'playing',
            isLoading: false,
            username: data.username,
            attempts: data.stats?.userAttempts ?? 0,
          }));
          if (data.stats) {
            setGlobalStats(prev => ({ ...prev, [data.puzzle!.id]: data.stats! }));
          }
        } else {
          setState(prev => ({ ...prev, isLoading: false, username: data.username }));
        }


      } catch (error) {
        console.error('Failed to init:', error);
      }
    };

    void init();

    const savedSolved = localStorage.getItem('symbologic_solved');
    if (savedSolved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(prev => ({ ...prev, solvedLevels: JSON.parse(savedSolved) }));
    }

    const savedCustom = localStorage.getItem('symbologic_crafts');
    if (savedCustom) {

      setCustomPuzzles(JSON.parse(savedCustom));
    }
  }, []);

  const updateGlobalStats = useCallback(async (type: 'attempt' | 'solve') => {
    if (!state.puzzle) return;
    try {
      const response = await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type } as UpdateStatsRequest),
      });

      if (response.ok) {
        const data: StatsResponse = await response.json();
        setGlobalStats(prev => ({ ...prev, [state.puzzle!.id]: data.stats }));
        if (type === 'attempt') {
          setState(prev => ({ ...prev, attempts: data.stats.userAttempts }));
        }
      }
    } catch (error) {
      console.error('Failed to update stats:', error);
    }
  }, [state.puzzle]);


  const submitScore = useCallback(async (score: number) => {
    try {
      await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score } as SubmitScoreRequest),
      });
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch('/api/leaderboard');
      if (response.ok) {
        const data: LeaderboardResponse = await response.json();
        return data.entries;
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
    return [];
  }, []);




  const handleInput = useCallback((val: string) => {
    setState(prev => {
      if (prev.status !== 'playing') return prev;
      return {
        ...prev,
        userInput: prev.userInput.length < 10 ? prev.userInput + val : prev.userInput
      };
    });
  }, []);

  const handleDelete = useCallback(() => {
    setState(prev => ({ ...prev, userInput: prev.userInput.slice(0, -1) }));
  }, []);

  const handleClear = useCallback(() => {
    setState(prev => ({ ...prev, userInput: '' }));
  }, []);

  const handleSubmit = useCallback(() => {
    setState(prev => {
      if (!prev.puzzle || !prev.userInput || prev.status !== 'playing') return prev;

      const numericAnswer = parseFloat(prev.userInput);
      const isCorrect = Math.abs(numericAnswer - prev.puzzle.answer) < 0.01;

      if (isCorrect) {
        const basePoints = 1000;
        const difficulty = prev.puzzle.id.startsWith('custom-') ? prev.puzzle.difficulty : (prev.currentLevel / 10 + 1);
        const difficultyMult = 1 + (difficulty / 5);
        const attemptPenalty = prev.attempts * 200; 
        const pointsEarned = Math.round(Math.max(100, (basePoints * difficultyMult) - attemptPenalty));
        const newScore = prev.score + pointsEarned;
        
        const newSolved = Array.from(new Set([...prev.solvedLevels, prev.currentLevel]));
        localStorage.setItem('symbologic_solved', JSON.stringify(newSolved));
        void updateGlobalStats('solve');

        // Automatically submit to leaderboard
        void submitScore(pointsEarned);

        return {
          ...prev,
          status: 'correct',
          score: newScore,
          solvedLevels: newSolved,
          lastPointsEarned: pointsEarned,
        };
      } else {

        void updateGlobalStats('attempt');
        // Side effect: timer to clear wrong state
        setTimeout(() => {
          setState(s => s.status === 'wrong' ? { ...s, status: 'playing', userInput: '' } : s);
        }, 1500);

        return {
          ...prev,
          status: 'wrong',
          attempts: prev.attempts + 1
        };
      }
    });
  }, [updateGlobalStats, submitScore]);

  const backToChallenges = useCallback(() => {
    setState(prev => ({ ...prev, status: 'playing',}));
  }, []);

  const resetGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: 'welcome',
      puzzle: null,
      userInput: '',
      attempts: 0,
    }));
  }, []);

  const handleOpenChallenges = useCallback(() => {
    setState(prev => ({ ...prev, status: 'challenges' }));
  }, []);

  const handleOpenCreator = useCallback(() => {
    setState(prev => ({ ...prev, status: 'config' }));
  }, []);

  const handleOpenLibrary = useCallback(() => {
    setState(prev => ({ ...prev, status: 'library' }));
  }, []);

  const handleOpenLeaderboard = useCallback(() => {
    setState(prev => ({ ...prev, status: 'leaderboard' }));
  }, []);

  const handlePlayCustomPuzzle = useCallback((puzzle: Puzzle) => {
    setState(prev => ({
      ...prev,
      status: 'playing',
      puzzle,
      userInput: '',
      attempts: 0,
      isLoading: false
    }));
    void updateGlobalStats('attempt');
  }, [updateGlobalStats]);

  const handleCreatePuzzle = useCallback(async (puzzle: Puzzle): Promise<CreatePuzzleResponse> => {
    const response = await fetch('/api/create-puzzle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ puzzle }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create puzzle');
    }

    const data: CreatePuzzleResponse = await response.json();
    return data;
  }, []);

  return {
    state,
    globalStats,
    customPuzzles,
    handlers: {
      handleInput,
      handleDelete,
      handleClear,
      handleSubmit,
      backToChallenges,
      resetGame,
      handleOpenChallenges,
      handleOpenCreator,
      handleOpenLibrary,
      handleOpenLeaderboard,
      handlePlayCustomPuzzle,
      handleCreatePuzzle,
      fetchLeaderboard,
    }

  };
};
