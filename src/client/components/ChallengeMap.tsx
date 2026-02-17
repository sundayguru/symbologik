
import React, { useState, useMemo } from 'react';
import { Puzzle, PuzzleStats } from '../types';
import { puzzles as standardPuzzlesData } from '../data/puzzleData';
import { Check, ChevronLeft } from 'lucide-react';

interface ChallengeMapProps {
  solvedLevels: number[];
  globalStats: Record<string, PuzzleStats>;
  customPuzzles: Puzzle[];
  onLoadLevel: (level: number) => void;
  onPlayCustomPuzzle: (puzzle: Puzzle) => void;
  onBack: () => void;
}

const ChallengeMap: React.FC<ChallengeMapProps> = ({
  solvedLevels,
  globalStats,
  customPuzzles,
  onLoadLevel,
  onPlayCustomPuzzle,
  onBack
}) => {
  const [difficultyFilter, setDifficultyFilter] = useState<number | 'all'>('all');

  const difficultyColors: Record<number, string> = {
    1: 'emerald',
    2: 'sky',
    3: 'indigo',
    4: 'purple',
    5: 'rose'
  };

  const difficultyLabels: Record<number, string> = {
    1: 'Beginner',
    2: 'Apprentice',
    3: 'Expert',
    4: 'Master',
    5: 'Legend'
  };

  const filteredLevels = useMemo(() => {
    const all = Array.from({ length: 50 }, (_, i) => i + 1);
    if (difficultyFilter === 'all') return all;
    return all.filter(level => {
      const data = standardPuzzlesData[level - 1];
      return data.difficulty === difficultyFilter;
    });
  }, [difficultyFilter]);

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-8 max-w-2xl mx-auto overflow-y-auto pb-24">
      <header className="flex flex-col gap-6 pt-2 sticky top-0 z-20 bg-[#0f172a]/95 backdrop-blur-md -mx-6 px-6 pb-4 border-b border-white/5 shadow-xl shadow-[#0f172a]/50">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-3 text-slate-400 hover:text-white transition-colors glass rounded-xl">
            <ChevronLeft />
          </button>
          <h1 className="text-2xl font-outfit font-black text-white tracking-tighter">MATRIX HUB</h1>
          <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border-white/10">
            <Check className="text-emerald-400 text-[10px]" />
            <span className="text-xs font-bold text-white">{solvedLevels.length} / 50</span>
          </div>
        </div>

        {/* Difficulty Filter Bar */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setDifficultyFilter('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${difficultyFilter === 'all'
              ? 'bg-white text-[#0f172a] border-white shadow-lg shadow-white/10'
              : 'glass text-slate-500 border-white/5 hover:border-white/20'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setDifficultyFilter(1)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${difficultyFilter === 1
              ? `bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/30`
              : 'glass text-slate-500 border-white/5 hover:border-white/20'
              }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full bg-emerald-400`}></div>
            {difficultyLabels[1]}
          </button>
          <button
            onClick={() => setDifficultyFilter(2)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${difficultyFilter === 2
              ? `bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/30`
              : 'glass text-slate-500 border-white/5 hover:border-white/20'
              }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full bg-sky-400`}></div>
            {difficultyLabels[2]}
          </button>


          <button
            onClick={() => setDifficultyFilter(3)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${difficultyFilter === 3
              ? `bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/30`
              : 'glass text-slate-500 border-white/5 hover:border-white/20'
              }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full bg-indigo-400`}></div>
            {difficultyLabels[3]}
          </button>
          <button
            onClick={() => setDifficultyFilter(4)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${difficultyFilter === 4
              ? `bg-purple-500 text-white border-purple-400 shadow-lg shadow-purple-500/30`
              : 'glass text-slate-500 border-white/5 hover:border-white/20'
              }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full bg-purple-400`}></div>
            {difficultyLabels[4]}
          </button>
          <button
            onClick={() => setDifficultyFilter(5)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${difficultyFilter === 5
              ? `bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30`
              : 'glass text-slate-500 border-white/5 hover:border-white/20'
              }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full bg-rose-400`}></div>
            {difficultyLabels[5]}
          </button>

        </div>
      </header>

      <div className="space-y-12">
        {/* Main Progression Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredLevels.map((level) => {
            const isSolved = solvedLevels.includes(level);
            const pid = `level-${level}`;
            const stats = globalStats[pid] || { attempts: 0, solved: 0 };
            const data = standardPuzzlesData[level - 1];
            const color = difficultyColors[data.difficulty];

            return (
              <button
                key={level}
                onClick={() => onLoadLevel(level)}
                className={`relative group flex flex-col items-start p-5 rounded-3xl transition-all overflow-hidden border ${isSolved
                  ? `bg-${color}-500/10 border-${color}-500/30`
                  : 'glass border-white/5 hover:border-white/20'
                  }`}
              >
                <div className="flex justify-between items-start w-full mb-4">
                  <span className={`text-4xl font-outfit font-black tracking-tighter ${isSolved ? `text-${color}-400` : 'text-slate-600 group-hover:text-white'}`}>
                    {level.toString().padStart(2, '0')}
                  </span>
                  {isSolved && (
                    <div className={`text-[10px] bg-${color}-500 text-[#0f172a] font-black px-2 py-0.5 rounded-full shadow-lg`}>
                      SOLVED
                    </div>
                  )}
                </div>

                <div className="mt-auto w-full">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${i < data.difficulty ? `bg-${color}-400` : 'bg-slate-800'
                            }`}
                        ></div>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 tracking-widest text-right">
                      By {data?.createdBy || 'Unknown'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[8px] font-black text-slate-500 uppercase tracking-widest">
                    <span>Attempts: {stats.attempts}</span>
                    <span>Solves: {stats.solved}</span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            );
          })}
        </div>

        {filteredLevels.length === 0 && (
          <div className="py-20 text-center space-y-4 opacity-50">
            <i className="fa-solid fa-ghost text-5xl text-slate-700"></i>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">No matrixes match this filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeMap;
