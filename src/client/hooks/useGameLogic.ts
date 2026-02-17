
import { useState, useEffect, useCallback } from 'react';
import { GameState, Puzzle, LeaderboardEntry, PuzzleStats } from '../types';
import { getPuzzle } from '../services/puzzleService';
import { InitResponse, CreatePuzzleResponse } from '../../shared/api';

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
            isLoading: false
          }));
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Failed to init:', error);
      }
    };

    init();

    const savedSolved = localStorage.getItem('symbologic_solved');
    if (savedSolved) {
      setState(prev => ({ ...prev, solvedLevels: JSON.parse(savedSolved) }));
    }

    const savedStats = localStorage.getItem('symbologic_global_stats');
    if (savedStats) {
      setGlobalStats(JSON.parse(savedStats));
    }

    const savedCustom = localStorage.getItem('symbologic_crafts');
    if (savedCustom) {
      setCustomPuzzles(JSON.parse(savedCustom));
    }
  }, []);

  const updateGlobalStats = useCallback((puzzleId: string, type: 'attempt' | 'solve') => {
    setGlobalStats(prev => {
      const current = prev[puzzleId] || { attempts: 0, solved: 0 };
      const next = {
        attempts: type === 'attempt' ? current.attempts + 1 : current.attempts,
        solved: type === 'solve' ? current.solved + 1 : current.solved
      };
      const updated = { ...prev, [puzzleId]: next };
      localStorage.setItem('symbologic_global_stats', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const saveScoreToLeaderboard = useCallback((score: number, level: number) => {
    const name = prompt("Matrix Complete! Enter your Architect ID for the Hall of Logic:", "PLAYER_" + Math.floor(Math.random() * 1000));
    if (!name) return;

    const newEntry: LeaderboardEntry = {
      name: name.toUpperCase(),
      score,
      level,
      date: new Date().toLocaleDateString()
    };

    const saved = localStorage.getItem('symbologic_leaderboard');
    const entries: LeaderboardEntry[] = saved ? JSON.parse(saved) : [];
    entries.push(newEntry);
    localStorage.setItem('symbologic_leaderboard', JSON.stringify(entries.sort((a, b) => b.score - a.score).slice(0, 10)));
  }, []);

  const loadLevel = useCallback(async (level: number) => {
    setState(prev => ({ 
      ...prev, 
      isLoading: true, 
      status: 'playing', 
      userInput: '', 
      attempts: 0, 
      currentLevel: level
    }));
    
    const puzzle = await getPuzzle(level);
    
    if (puzzle) {
      setState(prev => ({ ...prev, puzzle, isLoading: false }));
      updateGlobalStats(puzzle.id, 'attempt');
    } else {
      setState(prev => ({ ...prev, isLoading: false, status: 'gameover' }));
    }
  }, [updateGlobalStats]);

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
        updateGlobalStats(prev.puzzle.id, 'solve');

        if (prev.currentLevel === 50 && !prev.puzzle.id.startsWith('custom-')) {
          saveScoreToLeaderboard(newScore, prev.currentLevel);
        }

        return {
          ...prev,
          status: 'correct',
          score: newScore,
          solvedLevels: newSolved,
          lastPointsEarned: pointsEarned,
        };
      } else {
        updateGlobalStats(prev.puzzle.id, 'attempt');
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
  }, [updateGlobalStats, saveScoreToLeaderboard]);

  const backToChallenges = useCallback(() => {
    setState(prev => ({ ...prev, status: 'challenges', puzzle: null }));
    const savedCustom = localStorage.getItem('symbologic_crafts');
    if (savedCustom) setCustomPuzzles(JSON.parse(savedCustom));
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
    updateGlobalStats(puzzle.id, 'attempt');
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
      loadLevel,
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
    }
  };
};
