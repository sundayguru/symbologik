
import React, { useEffect } from 'react';
import { Puzzle, PuzzleStats } from '../types';
import EquationDisplay from './EquationDisplay';
import { Bolt, ChevronLeft, Search, User, Globe, Trophy } from 'lucide-react';

interface GameInterfaceProps {
  puzzle: Puzzle;
  currentLevel: number;
  score: number;
  userInput: string;
  attempts: number;
  status: string;
  globalStats: Record<string, PuzzleStats>;
  onInput: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onSubmit: () => void;
  onBack: () => void;
}


const GameInterface: React.FC<GameInterfaceProps> = ({
  puzzle,
  currentLevel,
  score,
  userInput,
  attempts,
  status,
  globalStats,
  onInput,
  onClear,
  onDelete,
  onSubmit,
  onBack
}) => {
  const currentStats = globalStats && puzzle ? globalStats[puzzle.id] : null;

  // Global keyboard listener remains for desktop experience (Enter/Escape)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== 'playing') return;

      if (e.key === 'Enter') {
        onSubmit();
      } else if (e.key === 'Escape') {
        onClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, onSubmit, onClear]);

  // Handler for direct input changes from the text field
  const handleInputChange = (val: string) => {
    // We update the state by essentially replacing it since it's a direct input now
    // But the hook expectes 'onInput' to append. Let's provide a way to set it directly 
    // or simulate backspace/input logic. For simplicity, we'll treat 'onInput' as 
    // the source of truth from the hook and allow standard typing.
    onInput(val.slice(-1) === userInput.slice(-1) ? "" : val);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-xl mx-auto px-4 py-2 relative">
      <header className="flex flex-col mb-2 glass rounded-xl overflow-hidden sticky top-2 z-50">
        <div className="flex items-center justify-between p-2">
          <div className="text-center flex-1">
            <h1 className="text-base font-bold font-outfit tracking-tight bg-gradient-to-r from-indigo-400 via-white to-purple-400 bg-clip-text text-transparent uppercase">SYMBOLOGIK</h1>
          </div>
          <div className="flex flex-col items-end px-2">
            <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-400">Score</span>
            <span className="text-lg font-outfit font-bold text-emerald-400">{score}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-2">
        <div className="space-y-1">
          <div className="flex justify-between items-end px-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Search size={14} className="text-slate-500" />
              Clues
            </h3>
            <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-1 py-0 rounded-full border border-white/5">
              ARCHITECT: {puzzle.createdBy}
            </span>
          </div>
          <div className="grid gap-1.5">
            {puzzle.clues.map((clue, idx) => (
              <EquationDisplay
                key={idx}
                equation={clue}
                symbols={puzzle.symbols}
                puzzle={puzzle}
                globalStats={globalStats}
                state={{ puzzle, currentLevel, score, userInput, attempts, status } as any}
              />
            ))}

          </div>
        </div>



        <div className="pt-4 space-y-1 border-t border-white/5">

          <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest px-2 flex items-center gap-1">
            <Bolt size={14} className="text-indigo-400" />
            Challenge Matrix
          </h3>
          <div className="flex flex-col gap-1.5">
            <EquationDisplay
              equation={puzzle.target}
              symbols={puzzle.symbols}
              isTarget
              userAnswer={userInput}
              puzzle={puzzle}
              globalStats={globalStats}
              state={{ puzzle, currentLevel, score, userInput, attempts, status } as any}
              onInputChange={(val) => {
                // Filter to allow only numbers, dot, and minus
                const filtered = val.replace(/[^0-9.\-]/g, '');
                // Clear the state and set it to the new filtered value
                onClear();
                for (let char of filtered) onInput(char);
              }}
            />

            <div className="flex flex-col gap-2 px-2">
              <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-wider">
                <div className="flex gap-1 items-center bg-slate-800/50 px-2 py-0.5 rounded-full border border-white/5">
                  <User size={10} className="text-indigo-400" />
                  <span className="text-slate-400">Your Attempts:</span>
                  <span className={attempts > 0 ? 'text-rose-400' : 'text-slate-400'}>{attempts}</span>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Globe size={10} />
                    <span>Attempts:</span>
                    <span className="text-indigo-300">
                      {currentStats?.globalAttempts || 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-500">
                    <Trophy size={10} />
                    <span>Solves:</span>
                    <span className="text-emerald-400">{currentStats?.globalSolved || 0}</span>
                  </div>



                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <span className="text-[7px] font-black text-slate-600 uppercase mr-1">Rank</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`w-1 h-1 rounded-full ${i < (puzzle.id.startsWith('custom-') ? puzzle.difficulty : 3) ? 'bg-indigo-400' : 'bg-slate-700'}`}></div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
        {currentStats && currentStats.userSolved > 0 && (
          <div className="flex items-center justify-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl animate-pulse">
            <Trophy className="text-emerald-400" size={20} />
            <span className="text-sm font-outfit font-bold text-emerald-300">You Balanced The Matrix!</span>
          </div>
        )}

        {status === 'wrong' && (
          <div className="flex items-center justify-center gap-2 text-red-400 font-bold animate-shake mt-2 bg-red-400/10 py-2 rounded-xl border border-red-400/20">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span className="uppercase text-[10px] tracking-widest font-black">Deduction Failure. Re-calculate.</span>
          </div>
        )}
      </main>

      <footer className="mt-auto py-1 justify-center flex">
        {!(currentStats?.userSolved && currentStats.userSolved > 0) && status !== 'correct' && (


          <div className="flex gap-2 w-full max-w-sm">
            <button
              onClick={onClear}
              className="flex-1 py-1.5 glass rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all border-white/5"
            >
              Reset
            </button>
            <button
              onClick={onSubmit}
              className="flex-[2] py-1.5 bg-indigo-600 rounded-xl text-[9px] font-black uppercase tracking-widest text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 border border-indigo-400/50"
            >
              Check Answer
            </button>
          </div>
        )}
      </footer>

    </div>
  );
};

export default GameInterface;
