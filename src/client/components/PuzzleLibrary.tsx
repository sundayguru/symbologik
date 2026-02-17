
import React, { useState, useEffect } from 'react';
import { Puzzle } from '../types';
import EquationDisplay from './EquationDisplay';
import { ChevronLeft, ChevronRight, Scroll, Trash } from 'lucide-react';

interface PuzzleLibraryProps {
  onPlay: (puzzle: Puzzle) => void;
  onBack: () => void;
}

const PuzzleLibrary: React.FC<PuzzleLibraryProps> = ({ onPlay, onBack }) => {
  const [crafts, setCrafts] = useState<Puzzle[]>([]);
  const [previewing, setPreviewing] = useState<Puzzle | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('symbologic_crafts');
    if (saved) {
      setCrafts(JSON.parse(saved));
    }
  }, []);

  const deletePuzzle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Destroy this blueprint forever?')) return;
    const newCrafts = crafts.filter(c => c.id !== id);
    setCrafts(newCrafts);
    localStorage.setItem('symbologic_crafts', JSON.stringify(newCrafts));
  };

  if (previewing) {
    return (
      <div className="min-h-screen flex flex-col p-6 space-y-8 max-w-2xl mx-auto overflow-y-auto">
        <header className="flex items-center justify-between pt-2">
          <button onClick={() => setPreviewing(null)} className="p-3 text-slate-400 hover:text-white transition-colors glass rounded-xl">
            <ChevronLeft className="text-slate-400" />
          </button>
          <div className="text-center">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">PREVIEWING</span>
            <h1 className="text-2xl font-outfit font-black text-white tracking-tighter uppercase">{previewing.name}</h1>
          </div>
          <div className="w-10"></div>
        </header>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">SYSTEM CLUES</h3>
            {previewing.clues.map((clue, idx) => (
              <EquationDisplay key={idx} equation={clue} symbols={previewing.symbols} />
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-2">CHALLENGE MATRIX</h3>
            <EquationDisplay equation={previewing.target} symbols={previewing.symbols} isTarget />
          </div>

          <div className="glass p-6 rounded-3xl border-white/5 space-y-2">
            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">ARCHITECT SOLUTION</h4>
            <p className="text-slate-300 text-sm italic">"{previewing.explanation}"</p>
            <div className="text-lg font-outfit font-bold text-white">Answer: {previewing.answer}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-8 max-w-2xl mx-auto overflow-y-auto pb-24">
      <header className="flex items-center justify-between pt-2">
        <button onClick={onBack} className="p-3 text-slate-400 hover:text-white transition-colors glass rounded-xl">
          <ChevronLeft className="text-slate-400" />
        </button>
        <div className="text-center w-full">
          <h1 className="text-3xl font-outfit font-black text-white tracking-tighter">YOUR MATRIXES</h1>
        </div>
      </header>

      {crafts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
          <i className="fa-solid fa-folder-open text-6xl text-slate-700"></i>
          <p className="text-slate-400 font-medium">No matrixes detected.</p>
          <button onClick={onBack} className="text-indigo-400 text-xs font-bold uppercase tracking-widest border-b border-indigo-500/30">Return to Main Menu</button>
        </div>
      ) : (
        <div className="grid gap-4">
          {crafts.map((puzzle) => (
            <div
              key={puzzle.id}
              className="glass rounded-3xl p-5 border-white/10 flex items-center justify-between group hover:border-indigo-500/30 transition-all cursor-pointer shadow-xl hover:shadow-indigo-500/5"
              onClick={() => setPreviewing(puzzle)}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                  <Scroll className="text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit font-bold text-white tracking-tight text-lg uppercase">{puzzle.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-bold">{puzzle.clues.length} CLUES</span>
                    <span className="text-slate-700">•</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => deletePuzzle(puzzle.id, e)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-rose-500/50 hover:text-rose-400 hover:bg-rose-400/10 transition-all"
                  title="Erase Blueprint"
                >
                  <Trash className="text-rose-400" />
                </button>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-all">
                  <ChevronRight className="text-slate-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PuzzleLibrary;
