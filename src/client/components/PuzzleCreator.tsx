
import React, { useState } from 'react';
import { context, navigateTo } from '@devvit/web/client';
import { Puzzle, Equation, EquationPart } from '../types';
import { ChevronLeft, Play, Plus, Send, Trash, X } from 'lucide-react';

interface PuzzleCreatorProps {
  onSave: (puzzle: Puzzle) => void;
  onCancel: () => void;
}

const EMOJI_OPTIONS = ['🍎', '🍌', '🍒', '🥑', '🥦', '🍕', '🚀', '⭐', '💎', '🤖', '👻', '🔥', '💧', '🌍', '❤️'];
const OPERATORS = ['+', '-', '*', '/'];
const DIFFICULTIES = [
  { val: 1, label: 'Beginner' },
  { val: 2, label: 'Apprentice' },
  { val: 3, label: 'Expert' },
  { val: 4, label: 'Master' },
  { val: 5, label: 'Legend' },
];

interface PuzzleCreatorProps {
  onCreate?: (puzzle: Puzzle) => Promise<{ url: string }>;
}

const PuzzleCreator: React.FC<PuzzleCreatorProps> = ({ onCreate }) => {
  const [puzzleName, setPuzzleName] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(3);
  const [symbols, setSymbols] = useState<Record<string, string>>({
    sym1: '🍎',
    sym2: '⭐',
  });
  const [clues, setClues] = useState<Equation[]>([
    { parts: [{ type: 'symbol', value: 'sym1' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'sym1' }], result: 10 }
  ]);
  const [target, setTarget] = useState<Equation>({
    parts: [{ type: 'symbol', value: 'sym1' }, { type: 'operator', value: '+' }, { type: 'number', value: 5 }]
  });
  const [answer, setAnswer] = useState<string>('10');
  const [explanation, setExplanation] = useState<string>('Calculated by the architect.');

  const getSymbolLimit = (diff: number) => {
    if (diff === 1) return 2;
    if (diff <= 3) return 3;
    return 5;
  };

  const MAX_CLUES = 4;

  const addClue = () => {
    if (clues.length < MAX_CLUES) {
      setClues([...clues, { parts: [{ type: 'symbol', value: 'sym1' }], result: 0 }]);
    }
  };

  const removeClue = (index: number) => {
    setClues(clues.filter((_, i) => i !== index));
  };

  const updateClueResult = (index: number, val: string) => {
    const newClues = [...clues];
    newClues[index].result = parseFloat(val) || 0;
    setClues(newClues);
  };

  const addPart = (eqType: 'clue' | 'target', index: number, partType: EquationPart['type']) => {
    const defaultVal = partType === 'symbol' ? Object.keys(symbols)[0] : partType === 'operator' ? '+' : 1;
    if (eqType === 'clue') {
      const newClues = [...clues];
      if (newClues[index]) {
        newClues[index].parts.push({ type: partType, value: defaultVal });
        setClues(newClues);
      }
    } else {
      setTarget({ ...target, parts: [...target.parts, { type: partType, value: defaultVal }] });
    }
  };

  const updatePart = (eqType: 'clue' | 'target', eqIdx: number, partIdx: number, val: string | number) => {
    if (eqType === 'clue') {
      const newClues = [...clues];
      if (newClues[eqIdx] && newClues[eqIdx].parts[partIdx]) {
        newClues[eqIdx].parts[partIdx].value = val;
        setClues(newClues);
      }
    } else {
      const newParts = [...target.parts];
      newParts[partIdx].value = val;
      setTarget({ ...target, parts: newParts });
    }
  };

  const removePart = (eqType: 'clue' | 'target', eqIdx: number, partIdx: number) => {
    if (eqType === 'clue') {
      const newClues = [...clues];
      if (newClues[eqIdx]) {
        newClues[eqIdx].parts = newClues[eqIdx].parts.filter((_, i) => i !== partIdx);
        setClues(newClues);
      }
    } else {
      setTarget({ ...target, parts: target.parts.filter((_, i) => i !== partIdx) });
    }
  };

  const handleRandomize = () => {
    const symbolKeys = Object.keys(symbols);
    const secretValues: Record<string, number> = {};

    // 1. Assign secret values based on difficulty
    const maxVal = difficulty * 10;
    symbolKeys.forEach(key => {
      secretValues[key] = Math.floor(Math.random() * maxVal) + 1;
    });

    // 2. Generate Clues
    const newClues: Equation[] = [];
    const ops = difficulty <= 2 ? ['+', '-'] : ['+', '-', '*', '/'];
    const numClues = Math.min(symbolKeys.length, MAX_CLUES);

    for (let i = 0; i < numClues; i++) {
      const parts: EquationPart[] = [];
      let result = 0;
      const key = symbolKeys[i];
      if (!key) continue;

      if (i === numClues - 1 && symbolKeys.length > numClues) {
        // Last clue slot, but more symbols remain (e.g. 5 symbols, 4 clues)
        // Combine remaining symbols into this clue
        const remainingKeys = symbolKeys.slice(i);
        const firstKey = remainingKeys[0];
        const secondKey = remainingKeys[1];
        if (!firstKey || !secondKey) continue;

        const op = ops[Math.floor(Math.random() * ops.length)] || '+';

        // Build: Sym4 op Sym5
        parts.push({ type: 'symbol', value: firstKey }, { type: 'operator', value: op }, { type: 'symbol', value: secondKey });

        switch (op) {
          case '+': result = (secretValues[firstKey] || 0) + (secretValues[secondKey] || 0); break;
          case '-': result = (secretValues[firstKey] || 0) - (secretValues[secondKey] || 0); break;
          case '*': result = (secretValues[firstKey] || 0) * (secretValues[secondKey] || 0); break;
          case '/':
            secretValues[firstKey] = (secretValues[secondKey] || 1) * (Math.floor(Math.random() * 5) + 1);
            result = secretValues[firstKey] / (secretValues[secondKey] || 1);
            break;
        }
      } else if (i === 0 || Math.random() > 0.5) {
        // Simple equation or Number Link
        const canUseNumber = difficulty < 4;

        if (!canUseNumber || Math.random() > 0.5) {
          // Use another symbol instead of self-addition or number
          const otherKey = symbolKeys[(i + 1) % symbolKeys.length];
          if (otherKey && otherKey !== key) {
            const op = ops[Math.floor(Math.random() * ops.length)] || '+';
            parts.push({ type: 'symbol', value: key }, { type: 'operator', value: op }, { type: 'symbol', value: otherKey });

            switch (op) {
              case '+': result = (secretValues[key] || 0) + (secretValues[otherKey] || 0); break;
              case '-': result = (secretValues[key] || 0) - (secretValues[otherKey] || 0); break;
              case '*': result = (secretValues[key] || 0) * (secretValues[otherKey] || 0); break;
              case '/':
                secretValues[key] = (secretValues[otherKey] || 1) * (Math.floor(Math.random() * 5) + 1);
                result = secretValues[key] / (secretValues[otherKey] || 1);
                break;
            }
          } else {
            // Fallback to number if no other symbol is available (unlikely)
            const num = Math.floor(Math.random() * 10) + 1;
            parts.push({ type: 'symbol', value: key }, { type: 'operator', value: '+' }, { type: 'number', value: num });
            result = (secretValues[key] || 0) + num;
          }
        } else {
          // Use Number (Beginner - Expert)
          const num = Math.floor(Math.random() * 10) + 1;
          parts.push({ type: 'symbol', value: key }, { type: 'operator', value: '+' }, { type: 'number', value: num });
          result = (secretValues[key] || 0) + num;
        }
      } else {
        // Compound equation: Symbol1 [op] Symbol2 (link to previous)
        const prevKey = symbolKeys[i - 1];
        if (!prevKey) continue;
        const op = ops[Math.floor(Math.random() * ops.length)] || '+';
        parts.push({ type: 'symbol', value: key }, { type: 'operator', value: op }, { type: 'symbol', value: prevKey });

        switch (op) {
          case '+': result = (secretValues[key] || 0) + (secretValues[prevKey] || 0); break;
          case '-': result = (secretValues[key] || 0) - (secretValues[prevKey] || 0); break;
          case '*': result = (secretValues[key] || 0) * (secretValues[prevKey] || 0); break;
          case '/':
            secretValues[key] = (secretValues[prevKey] || 1) * (Math.floor(Math.random() * 5) + 1);
            result = secretValues[key] / (secretValues[prevKey] || 1);
            break;
        }
      }
      newClues.push({ parts, result });
    }

    // 3. Generate Target
    const targetParts: EquationPart[] = [];
    let targetResult = 0;
    const randomSym = symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
    const randomSym2 = symbolKeys[Math.floor(Math.random() * symbolKeys.length)];

    if (difficulty >= 3) {
      targetParts.push({ type: 'symbol', value: randomSym }, { type: 'operator', value: '*' }, { type: 'symbol', value: randomSym2 });
      targetResult = secretValues[randomSym] * secretValues[randomSym2];
    } else {
      targetParts.push({ type: 'symbol', value: randomSym }, { type: 'operator', value: '+' }, { type: 'symbol', value: randomSym2 });
      targetResult = secretValues[randomSym] + secretValues[randomSym2];
    }

    setClues(newClues);
    setTarget({ parts: targetParts });
    setAnswer(targetResult.toString());
    setExplanation(`Based on the clues: ${symbolKeys.map(k => `${symbols[k]}=${secretValues[k]}`).join(', ')}. Therefore the target result is ${targetResult}.`);
    if (!puzzleName) setPuzzleName(`Matrix ${Math.floor(Math.random() * 1000)}`);
  };

  const handleStart = async () => {
    const customPuzzle: Puzzle = {
      id: 'custom-' + Date.now(),
      name: puzzleName || 'Unnamed Blueprint',
      level: 0,
      clues,
      target,
      answer: parseFloat(answer),
      explanation,
      symbols,
      difficulty,
      createdBy: context.username || 'Unknown',
    };

    try {
      if (onCreate) {
        const result = await onCreate(customPuzzle);
        if (result && result.url) {
          navigateTo(result.url);
        }
      } else {
        // Fallback for local storage if onCreate is not provided
        const saved = localStorage.getItem('symbologic_crafts');
        const crafts = saved ? JSON.parse(saved) : [];
        crafts.unshift(customPuzzle);
        localStorage.setItem('symbologic_crafts', JSON.stringify(crafts));
        console.log('Saved to local storage:', customPuzzle);
      }
    } catch (error) {
      console.error('Failed to create puzzle:', error);
      alert('Failed to post puzzle. Please try again.');
    }
  };

  const EquationBuilder = ({ eq, idx, type }: { eq: Equation, idx: number, type: 'clue' | 'target', key?: React.Key }) => (
    <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {eq.parts.map((part, pIdx) => (
          <div key={pIdx} className="group relative flex items-center bg-slate-700/50 p-1.5 rounded-lg border border-white/10">
            {part.type === 'symbol' && (
              <select
                value={part.value}
                onChange={(e) => updatePart(type, idx, pIdx, e.target.value)}
                className="bg-transparent text-xl appearance-none cursor-pointer focus:outline-none"
              >
                {Object.keys(symbols).map(s => <option key={s} value={s}>{symbols[s]}</option>)}
              </select>
            )}
            {part.type === 'operator' && (
              <select
                value={part.value}
                onChange={(e) => updatePart(type, idx, pIdx, e.target.value)}
                className="bg-transparent font-bold text-lg appearance-none cursor-pointer focus:outline-none px-1"
              >
                {OPERATORS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            )}
            {part.type === 'number' && (
              <input
                type="number"
                value={part.value}
                onChange={(e) => updatePart(type, idx, pIdx, parseInt(e.target.value) || 0)}
                className="w-12 bg-transparent text-center font-bold focus:outline-none"
              />
            )}
            <button
              onClick={() => removePart(type, idx, pIdx)}
              className="ml-1 text-[10px] text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="text-rose-400" />
            </button>
          </div>
        ))}

        <div className="flex gap-1 ml-auto">
          <button onClick={() => addPart(type, idx, 'symbol')} className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs hover:bg-indigo-500/40" title="Add Symbol">S</button>
          <button onClick={() => addPart(type, idx, 'operator')} className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-xs hover:bg-purple-500/40" title="Add Operator">Op</button>
          <button onClick={() => addPart(type, idx, 'number')} className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/40" title="Add Number">#</button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-white/5 pt-2 mt-2">
        <span className="text-slate-500 font-bold">=</span>
        {type === 'clue' ? (
          <input
            type="number"
            value={eq.result || 0}
            onChange={(e) => updateClueResult(idx, e.target.value)}
            className="bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-lg w-20 focus:outline-none text-center"
          />
        ) : (
          <span className="text-indigo-400 font-bold px-3 py-1 rounded-lg bg-indigo-500/10 border border-dashed border-indigo-500/30">?</span>
        )}
        {type === 'clue' && (
          <button onClick={() => removeClue(idx)} className="ml-auto text-rose-500 hover:text-rose-400 p-2">
            <Trash className="text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6 max-w-2xl mx-auto overflow-y-auto pb-24">
      <header className="flex items-center justify-between">
        <div className="text-center w-full">
          <h1 className="text-2xl font-outfit font-bold text-white tracking-tight">PUZZLE ARCHITECT</h1>
        </div>
      </header>

      <section className="glass rounded-3xl p-6 space-y-6 border-white/10">
        <div className="flex items-center justify-end">
          <button
            onClick={handleRandomize}
            className="text-[10px] font-black bg-indigo-500 text-white px-4 py-2 rounded-full shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-shuffle"></i>
            RANDOMIZE
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">DIFFICULTY RANKING</h3>
          <div className="flex gap-2">
            {DIFFICULTIES.map(d => (
              <button
                key={d.val}
                onClick={() => {
                  setDifficulty(d.val);
                  // Prune symbols if needed
                  const limit = getSymbolLimit(d.val);
                  const currentSymbols = Object.keys(symbols);
                  if (currentSymbols.length > limit) {
                    const newSyms = { ...symbols };
                    currentSymbols.slice(limit).forEach(key => delete newSyms[key]);
                    setSymbols(newSyms);
                  }
                }}
                className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all border ${difficulty === d.val
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-800 border-white/5 text-slate-500 hover:border-white/20'
                  }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">1. SYMBOLS</h3>
          <div className="flex flex-wrap gap-4">
            {Object.keys(symbols).map(key => (
              <div key={key} className="flex flex-col items-center gap-2">
                <div className="relative group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl border border-white/5 shadow-inner">
                    {symbols[key]}
                  </div>
                  <select
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    value={symbols[key]}
                    onChange={(e) => setSymbols({ ...symbols, [key]: e.target.value })}
                  >
                    {EMOJI_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{key}</span>
                  {Object.keys(symbols).length > 1 && (
                    <button
                      onClick={() => {
                        const newSyms = { ...symbols };
                        delete newSyms[key];
                        setSymbols(newSyms);
                      }}
                      className="text-rose-500/50 hover:text-rose-400 text-[10px]"
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
            {Object.keys(symbols).length < getSymbolLimit(difficulty) && difficulty > 1 && (
              <button
                onClick={() => {
                  const newKey = `sym${Object.keys(symbols).length + 1}`;
                  setSymbols({ ...symbols, [newKey]: EMOJI_OPTIONS[Object.keys(symbols).length % EMOJI_OPTIONS.length] });
                }}
                className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
              >
                <Plus className="text-slate-500" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">2. CLUES</h3>
            {clues.length < MAX_CLUES && (
              <button onClick={addClue} className="text-[10px] font-bold bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 hover:bg-indigo-500/20">
                ADD CLUE
              </button>
            )}
          </div>
          {clues.map((clue, i) => <EquationBuilder key={i} eq={clue} idx={i} type="clue" />)}
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">3. CHALLENGE</h3>
          <EquationBuilder eq={target} idx={0} type="target" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">FINAL ANSWER</h3>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full bg-slate-800/80 p-4 rounded-xl border border-white/5 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-outfit font-bold text-indigo-300"
              placeholder="Result to check against..."
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">EXPLANATION</h3>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full bg-slate-800/80 p-4 rounded-xl border border-white/5 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm min-h-[56px] resize-none"
              placeholder="Explain the solution..."
            />
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-6 glass border-t border-white/10 z-[70]">
        <button
          onClick={handleStart}
          disabled={!answer || clues.length === 0}
          className="w-full max-w-2xl mx-auto py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/30 active:scale-95 text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          GENERATE & POST
          <Send className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default PuzzleCreator;
