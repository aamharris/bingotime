import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameTypeSelector } from '../components/GameTypeSelector';
import { GameType } from '../types/game';
import { nanoid } from 'nanoid';

export const CreateGame: React.FC = () => {
  const [gameType, setGameType] = useState<GameType>('regular');
  const navigate = useNavigate();

  const handleCreateGame = () => {
    const gameId = nanoid(6);
    // TODO: Initialize socket connection and create game
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Create Bingo Game</h1>
        
        <div className="space-y-6">
          <GameTypeSelector 
            selectedType={gameType}
            onTypeSelect={setGameType}
          />

          <button
            onClick={handleCreateGame}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Create Game
          </button>
        </div>
      </div>
    </div>
  );
};