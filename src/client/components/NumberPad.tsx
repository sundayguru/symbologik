
import React from 'react';

interface NumberPadProps {
  onInput: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const NumberPad: React.FC<NumberPadProps> = ({ onInput, onClear, onDelete, onSubmit, disabled }) => {
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', '.'];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto mt-6">
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => onInput(btn)}
          disabled={disabled}
          className="h-14 md:h-16 flex items-center justify-center text-xl font-bold font-outfit rounded-xl glass hover:bg-white/10 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {btn}
        </button>
      ))}
      <button
        onClick={onClear}
        className="h-14 md:h-16 flex items-center justify-center text-lg font-bold rounded-xl glass text-red-400 hover:bg-red-400/10 transition-all"
      >
        C
      </button>
      <button
        onClick={onDelete}
        className="h-14 md:h-16 flex items-center justify-center text-lg font-bold rounded-xl glass hover:bg-white/10 transition-all"
      >
        <i className="fa-solid fa-delete-left"></i>
      </button>
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="h-14 md:h-16 flex items-center justify-center text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
      >
        GO!
      </button>
    </div>
  );
};

export default NumberPad;
