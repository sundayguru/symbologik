
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
    <div className={`flex items-center justify-center gap-1.5 p-1 rounded-xl glass transition-all hover:scale-[1.01] ${isTarget ? 'border border-indigo-500/50 bg-indigo-500/10 shadow-md shadow-indigo-500/10' : ''}`}>
      <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
        {equation.parts.map((part, idx) => (
          <div key={idx} className="flex items-center">
            {part.type === 'symbol' && (
              <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl float-animation drop-shadow-sm">
                  {symbols[part.value as string] || '❓'}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">{part.value}</span>
              </div>
            )}
            {part.type === 'operator' && (
              <span className="text-lg md:text-xl font-bold text-slate-300 px-0.5">
                {part.value === '*' ? '×' : part.value === '/' ? '÷' : part.value}
              </span>
            )}
            {part.type === 'number' && (
              <span className="text-lg md:text-xl font-outfit font-bold text-white bg-slate-700/50 px-2 py-0.5 rounded-md">
                {part.value}
              </span>
            )}
          </div>
        ))}

        <span className="text-lg md:text-xl font-bold text-slate-300">=</span>

        {isTarget ? (
          <div className="relative w-20 md:w-24 h-10 md:h-12">
            <input
              type="text"
              inputMode="decimal"
              placeholder="?"
              value={userAnswer || ''}
              onChange={(e) => onInputChange?.(e.target.value)}
              className="w-full h-full text-center text-xl md:text-2xl font-outfit font-bold text-indigo-300 bg-indigo-400/10 border border-dashed border-indigo-500/50 rounded-xl focus:outline-none focus:border-indigo-400 focus:bg-indigo-400/20 placeholder-slate-600 transition-all"
            />
          </div>
        ) : (
          <span className="text-lg md:text-xl font-outfit font-bold text-emerald-400 bg-emerald-400/10 px-3 py-0.5 rounded-md shadow-inner">
            {equation.result}
          </span>
        )}
      </div>
    </div>
  );
};

export default EquationDisplay;
