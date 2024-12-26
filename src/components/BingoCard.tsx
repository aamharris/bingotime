import React from 'react';
import { clsx } from 'clsx';

interface BingoCardProps {
  card: number[][];
  calledNumbers: number[];
  onCellClick?: (row: number, col: number) => void;
  selectedCells?: boolean[][];
}

export const BingoCard: React.FC<BingoCardProps> = ({ 
  card, 
  calledNumbers, 
  onCellClick,
  selectedCells = Array(5).fill(null).map(() => Array(5).fill(false))
}) => {
  const headers = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className="max-w-lg mx-auto">
      <div className="grid grid-cols-5 gap-2">
        {headers.map((letter, i) => (
          <div key={letter} className="text-center font-bold text-2xl text-blue-600">
            {letter}
          </div>
        ))}
        {card.map((row, rowIndex) => (
          row.map((num, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick?.(rowIndex, colIndex)}
              className={clsx(
                "aspect-square flex items-center justify-center border-2 rounded-lg text-xl font-semibold cursor-pointer transition-colors",
                {
                  'bg-blue-100 border-blue-300': selectedCells[rowIndex][colIndex],
                  'hover:bg-gray-100': !selectedCells[rowIndex][colIndex],
                  'bg-green-100 border-green-300': calledNumbers.includes(num),
                  'bg-yellow-100 border-yellow-300': num === 0
                }
              )}
            >
              {num === 0 ? 'FREE' : num}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};