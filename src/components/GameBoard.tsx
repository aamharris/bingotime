import React, { useState } from 'react';
import { Game, Player } from '../types/game';
import { BingoCard } from './BingoCard';
import { NumberBoard } from './NumberBoard';
import { PrintCards } from './PrintCards';
import { checkWin } from '../utils/gameUtils';

interface GameBoardProps {
  game: Game;
  player: Player;
  isHost: boolean;
  onCallNumber: (number: number) => void;
  onBingo: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  game,
  player,
  isHost,
  onCallNumber,
  onBingo
}) => {
  const [selectedCells, setSelectedCells] = useState<boolean[][]>(
    Array(5).fill(null).map(() => Array(5).fill(false))
  );

  const handleCellClick = (row: number, col: number) => {
    const newSelectedCells = selectedCells.map((r, i) =>
      r.map((cell, j) => i === row && j === col ? !cell : cell)
    );
    setSelectedCells(newSelectedCells);
  };

  const canBingo = checkWin(player.card, game.calledNumbers, game.type);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Bingo Card</h2>
          <BingoCard
            card={player.card}
            calledNumbers={game.calledNumbers}
            onCellClick={handleCellClick}
            selectedCells={selectedCells}
          />
          {!isHost && (
            <button
              onClick={onBingo}
              disabled={!canBingo}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Bingo!
            </button>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Called Numbers</h2>
          <NumberBoard
            calledNumbers={game.calledNumbers}
            onNumberCall={isHost ? onCallNumber : undefined}
          />
          {isHost && (
            <PrintCards gameType={game.type} />
          )}
        </div>
      </div>
    </div>
  );
};