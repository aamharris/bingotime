import React from 'react';
import { Game } from '../types/game';
import { Users, Copy } from 'lucide-react';

interface GameLobbyProps {
  game: Game;
  onStartGame: () => void;
  isHost: boolean;
}

export const GameLobby: React.FC<GameLobbyProps> = ({ game, onStartGame, isHost }) => {
  const copyGameCode = () => {
    navigator.clipboard.writeText(game.id);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Game Lobby</h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Game Code:</span>
            <code className="bg-gray-100 px-3 py-1 rounded">{game.id}</code>
            <button
              onClick={copyGameCode}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Copy game code"
            >
              <Copy size={20} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Users size={20} />
            <h3 className="text-lg font-semibold">Players ({game.players.length})</h3>
          </div>
          <ul className="space-y-2">
            {game.players.map((player) => (
              <li
                key={player.id}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded"
              >
                <span className="font-medium">{player.name}</span>
                {player.id === game.host && (
                  <span className="text-sm text-blue-600">(Host)</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {isHost && (
          <button
            onClick={onStartGame}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={game.players.length < 2}
          >
            Start Game
          </button>
        )}
      </div>
    </div>
  );
};