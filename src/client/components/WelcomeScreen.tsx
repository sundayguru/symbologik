
import React from 'react';
import { requestExpandedMode } from '@devvit/web/client';

interface WelcomeScreenProps {
  onOpenChallenges: () => void;
  onOpenCreator: () => void;
  onOpenLibrary: () => void;
  onOpenLeaderboard: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onOpenChallenges,
  onOpenCreator,
  onOpenLibrary,
  onOpenLeaderboard
}) => {
  return (
    <div className="h-full max-h-[600px] w-full max-w-[800px] mx-auto flex flex-col items-center justify-between px-4 py-4 gap-6">
      <div className="flex justify-between text-center space-y-4">
        <div className="flex justify-center gap-6 mb-2">
          <span className="text-4xl md:text-5xl lg:text-6xl float-animation" style={{ animationDelay: '0s' }}>🤖</span>
          <span className="text-4xl md:text-5xl lg:text-6xl float-animation" style={{ animationDelay: '0.5s' }}>📟</span>
          <span className="text-4xl md:text-5xl lg:text-6xl float-animation" style={{ animationDelay: '1s' }}>🔋</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-black tracking-tighter bg-gradient-to-r from-indigo-400 via-white to-purple-400 bg-clip-text text-transparent uppercase text-center leading-tight">
          SymboLogik
        </h1>
      </div>

      <nav className="w-full flex-1 flex flex-col justify-center gap-3">
        <button
          onClick={onOpenChallenges}
          className="w-full group relative overflow-hidden glass p-1 rounded-3xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative p-5 md:p-6 rounded-[1.4rem] bg-indigo-600 text-white flex items-center justify-between shadow-xl shadow-indigo-600/20">
            <div className="flex flex-col items-start text-left">
              <span className="text-xl md:text-2xl font-outfit font-black uppercase">Open Matrix</span>
              <span className="text-xs opacity-70 mt-1 font-medium">Select from available matrixes</span>
            </div>

          </div>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
            className="group glass p-4 rounded-3xl flex flex-col items-start text-left hover:border-indigo-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >

            <span className="text-lg font-outfit font-bold text-white uppercase tracking-tight">Architect</span>
            <span className="text-xs text-slate-500 font-medium mt-1">Design your own symbolic matrixes</span>
          </button>

          <button
            onClick={onOpenLibrary}
            className="group glass p-4 rounded-3xl flex flex-col items-start text-left hover:border-emerald-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >

            <span className="text-lg font-outfit font-bold text-white uppercase tracking-tight">Vault</span>
            <span className="text-xs text-slate-500 font-medium mt-1">Browse your matrixes</span>
          </button>

          <button
            onClick={onOpenLeaderboard}
            className="group glass p-4 rounded-3xl flex flex-col items-start text-left hover:border-amber-500/50 transition-all hover:scale-[1.02] active:scale-[0.98] md:col-span-2"
          >

            <span className="text-lg font-outfit font-bold text-white uppercase tracking-tight">Rankings</span>
            <span className="text-xs text-slate-500 font-medium mt-1">Global hall of logic masters</span>
          </button>
        </div>
      </nav>


    </div>
  );
};

export default WelcomeScreen;
