
import { Check } from 'lucide-react';
import React from 'react';

interface SuccessModalProps {
  pointsEarned: number;
  explanation: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ pointsEarned, explanation, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="glass p-8 rounded-3xl text-center max-w-sm w-full border-2 border-emerald-500/50 space-y-6 shadow-2xl shadow-emerald-500/20">
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
          <Check className="text-emerald-400" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-outfit font-bold text-white">Solved!</h2>
          <div className="py-2">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Score Earned</div>
            <div className="text-5xl font-outfit font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              +{pointsEarned.toLocaleString()}
            </div>
          </div>
          {explanation && <p className="text-slate-300 leading-relaxed text-sm bg-slate-900/40 p-3 rounded-xl border border-white/5">{explanation}</p>}
        </div>
        <button
          onClick={onClose}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/30 active:scale-95 flex items-center justify-center gap-2"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
