
import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { ChevronLeft } from 'lucide-react';

interface LeaderboardProps {
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('symbologic_leaderboard');
    if (saved) {
      setEntries(JSON.parse(saved));
    } else {
      // Default mock data if empty
      const mockData: LeaderboardEntry[] = [
        { name: "ALAN_T", score: 12500, level: 50, date: new Date().toLocaleDateString() },
        { name: "EMMY_N", score: 11200, level: 45, date: new Date().toLocaleDateString() },
        { name: "BLAISE_P", score: 9800, level: 38, date: new Date().toLocaleDateString() },
        { name: "ADA_L", score: 8500, level: 32, date: new Date().toLocaleDateString() },
        { name: "PYTHAGORAS", score: 7200, level: 25, date: new Date().toLocaleDateString() },
        { name: "ALAN_T", score: 12500, level: 50, date: new Date().toLocaleDateString() },
        { name: "EMMY_N", score: 11200, level: 45, date: new Date().toLocaleDateString() },
        { name: "BLAISE_P", score: 9800, level: 38, date: new Date().toLocaleDateString() },
        { name: "ADA_L", score: 8500, level: 32, date: new Date().toLocaleDateString() },
        { name: "PYTHAGORAS", score: 7200, level: 25, date: new Date().toLocaleDateString() }
      ];
      setEntries(mockData);
      localStorage.setItem('symbologic_leaderboard', JSON.stringify(mockData));
    }
  }, []);

  const topEntries = [...entries].sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <div className="h-full max-h-[600px] w-full max-w-[800px] mx-auto flex flex-col px-2 py-2 gap-2">
      <header className="flex items-center justify-between gap-2">
        <button onClick={onBack} className="p-1 text-slate-400 hover:text-white transition-colors glass rounded-md">
          <ChevronLeft className="text-slate-400" />
        </button>
        <div className="text-center w-full">
          <h1 className="text-lg md:text-xl font-outfit font-black text-white tracking-tighter">HALL OF LOGIC</h1>
        </div>
      </header>

      <div className="glass rounded-2xl p-3 md:p-4 border-white/10 shadow-xl relative overflow-hidden flex-1">
        <div className="absolute top-0 right-0 p-3 opacity-10 rotate-12">
          <i className="fa-solid fa-trophy text-3xl text-amber-400"></i>
        </div>

        <div className="space-y-1 relative z-10 h-full overflow-hidden">
          <div className="space-y-[2px] max-h-full">
            {topEntries.map((entry, idx) => (
              <div
                key={idx}
                className={`flex justify-between gap-2 px-2 py-1 rounded-xl items-center transition-all ${idx === 0 ? 'bg-amber-500/10 border border-amber-500/20' :
                  idx === 1 ? 'bg-slate-300/10 border border-slate-300/20' :
                    idx === 2 ? 'bg-orange-500/10 border border-orange-500/20' :
                      'bg-slate-900/40 border border-white/5'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-outfit font-black text-[9px] ${idx === 0 ? 'bg-amber-500 text-slate-900' :
                    idx === 1 ? 'bg-slate-300 text-slate-900' :
                      idx === 2 ? 'bg-orange-500 text-slate-900' :
                        'bg-slate-800 text-slate-400'
                    }`}>
                    {idx + 1}
                  </div>
                  <span className="font-outfit font-semibold text-xs text-white tracking-tight">{entry.name}</span>
                </div>

                <div className={`text-right font-outfit font-semibold text-xs ${idx === 0 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                  {entry.score.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Leaderboard;
