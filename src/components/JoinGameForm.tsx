import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface JoinGameFormProps {
  onSubmit: (gameCode: string, username: string) => void;
}

export const JoinGameForm: React.FC<JoinGameFormProps> = ({ onSubmit }) => {
  const [gameCode, setGameCode] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameCode.trim() && username.trim()) {
      onSubmit(gameCode.trim(), username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="gameCode" className="block text-sm font-medium text-gray-700">
          Game Code
        </label>
        <input
          type="text"
          id="gameCode"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value.toUpperCase())}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter 6-digit code"
          maxLength={6}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your name"
          maxLength={20}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
      >
        <UserPlus className="w-5 h-5" />
        Join Game
      </button>
    </form>
  );
};