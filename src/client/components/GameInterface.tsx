
import React, { useEffect } from 'react';
import { Puzzle } from '../types';
import EquationDisplay from './EquationDisplay';
import { Bolt, ChevronLeft, Search } from 'lucide-react';

interface GameInterfaceProps {
  puzzle: Puzzle;
  currentLevel: number;
  score: number;
  userInput: string;
  attempts: number;
  status: string;
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
  onInput,
  onClear,
  onDelete,
  onSubmit,
  onBack
}) => {
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
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto px-4 py-4 relative">
      <header className="flex flex-col mb-4 glass rounded-2xl overflow-hidden sticky top-4 z-50">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center glass rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="text-slate-400" />
          </button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold font-outfit tracking-tight bg-gradient-to-r from-indigo-400 via-white to-purple-400 bg-clip-text text-transparent uppercase">SYMBOLOGIC</h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Score</span>
            <span className="text-2xl font-outfit font-bold text-emerald-400">{score}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-end px-2">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Search className="text-slate-500" />
              Clues
            </h3>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
              ARCHITECT: {puzzle.createdBy}
            </span>
          </div>
          <div className="grid gap-3">
            {puzzle.clues.map((clue, idx) => (
              <EquationDisplay
                key={idx}
                equation={clue}
                symbols={puzzle.symbols}
              />
            ))}
          </div>
        </div>

        <div className="pt-8 space-y-2 border-t border-white/5">
          <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest px-2 flex items-center gap-2">
            <Bolt className="text-indigo-400" />
            Challenge Matrix
          </h3>
          <div className="flex flex-col gap-2">
            <EquationDisplay
              equation={puzzle.target}
              symbols={puzzle.symbols}
              isTarget
              userAnswer={userInput}
              onInputChange={(val) => {
                // Filter to allow only numbers, dot, and minus
                const filtered = val.replace(/[^0-9.\-]/g, '');
                // Clear the state and set it to the new filtered value
                onClear();
                // This is a bit of a hack since useGameLogic.ts appends. 
                // We'll rely on onInput being called for each character for now 
                // but ideally useGameLogic would have a setInput method.
                // For this implementation, we'll just use the input's value directly.
                for (let char of filtered) onInput(char);
              }}
            />
            <div className="flex justify-between px-2">
              <div className="flex gap-1 items-center">
                <span className="text-[8px] font-black text-slate-600 uppercase mr-1">Rank</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < (puzzle.id.startsWith('custom-') ? puzzle.difficulty : 3) ? 'bg-indigo-400' : 'bg-slate-700'}`}></div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                Attempts: <span className={attempts > 0 ? 'text-rose-400' : 'text-slate-400'}>{attempts}</span>
              </span>
            </div>
          </div>
        </div>

        {status === 'wrong' && (
          <div className="flex items-center justify-center gap-2 text-red-400 font-bold animate-shake mt-4 bg-red-400/10 py-4 rounded-2xl border border-red-400/20">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span className="uppercase text-xs tracking-widest font-black">Deduction Failure. Re-calculate.</span>
          </div>
        )}
      </main>

      <footer className="mt-auto py-2 justify-center flex">
        <div className="flex gap-4 w-full max-w-sm">
          <button
            onClick={onClear}
            className="flex-1 py-2 glass rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all border-white/5"
          >
            Reset (Esc)
          </button>
          <button
            onClick={onSubmit}
            className="flex-[2] py-2 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 border border-indigo-400/50"
          >
            Check Answer (Enter)
          </button>
        </div>
      </footer>
    </div>
  );
};

export default GameInterface;
