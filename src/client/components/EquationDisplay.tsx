
import React from 'react';
import { Equation } from '../types';

interface EquationDisplayProps {
  equation: Equation;
  symbols: Record<string, string>;
  isTarget?: boolean;
  userAnswer?: string;
  onInputChange?: (val: string) => void;
}

const EquationDisplay: React.FC<EquationDisplayProps> = ({
  equation,
  symbols,
  isTarget,
  userAnswer,
  onInputChange
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 p-2 rounded-2xl glass transition-all hover:scale-[1.02] ${isTarget ? 'border-2 border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/20' : ''}`}>
      <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
        {equation.parts.map((part, idx) => (
          <div key={idx} className="flex items-center">
            {part.type === 'symbol' && (
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl float-animation drop-shadow-md">
                  {symbols[part.value as string] || '❓'}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">{part.value}</span>
              </div>
            )}
            {part.type === 'operator' && (
              <span className="text-2xl md:text-4xl font-bold text-slate-300 px-1">
                {part.value === '*' ? '×' : part.value === '/' ? '÷' : part.value}
              </span>
            )}
            {part.type === 'number' && (
              <span className="text-2xl md:text-4xl font-outfit font-bold text-white bg-slate-700/50 px-3 py-1 rounded-lg">
                {part.value}
              </span>
            )}
          </div>
        ))}

        <span className="text-2xl md:text-4xl font-bold text-slate-300">=</span>

        {isTarget ? (
          <div className="relative w-24 md:w-32 h-14 md:h-20">
            <input
              type="text"
              inputMode="decimal"
              placeholder="?"
              value={userAnswer || ''}
              onChange={(e) => onInputChange?.(e.target.value)}
              className="w-full h-full text-center text-3xl md:text-5xl font-outfit font-bold text-indigo-300 bg-indigo-400/10 border-2 border-dashed border-indigo-500/50 rounded-2xl focus:outline-none focus:border-indigo-400 focus:bg-indigo-400/20 placeholder-slate-600 transition-all"
            />
          </div>
        ) : (
          <span className="text-2xl md:text-4xl font-outfit font-bold text-emerald-400 bg-emerald-400/10 px-4 py-1 rounded-lg shadow-inner">
            {equation.result}
          </span>
        )}
      </div>
    </div>
  );
};

export default EquationDisplay;
