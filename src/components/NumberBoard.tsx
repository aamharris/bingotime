import React from 'react';
import { clsx } from 'clsx';

interface NumberBoardProps {
  calledNumbers: number[];
  onNumberCall?: (number: number) => void;
}

export const NumberBoard: React.FC<NumberBoardProps> = ({
  calledNumbers,
  onNumberCall
}) => {
  const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
  const columns = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-5 gap-2">
        {columns.map((letter, i) => (
          <div key={letter} className="text-center font-bold text-xl text-blue-600 mb-2">
            {letter}
          </div>
        ))}
        {numbers.map((number) => {
          const called = calledNumbers.includes(number);
          const column = Math.floor((number - 1) / 15);
          
          return (
            <button
              key={number}
              onClick={() => !called && onNumberCall?.(number)}
              disabled={called || !onNumberCall}
              className={clsx(
                'aspect-square flex items-center justify-center rounded-lg text-lg font-semibold transition-colors',
                called
                  ? 'bg-blue-100 text-blue-800'
                  : onNumberCall
                  ? 'hover:bg-gray-100 cursor-pointer'
                  : 'cursor-default',
                'border-2',
                called ? 'border-blue-300' : 'border-gray-200'
              )}
              style={{ gridColumn: column + 1 }}
            >
              {number}
            </button>
          );
        })}
      </div>
    </div>
  );
};