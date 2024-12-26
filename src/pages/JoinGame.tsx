import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JoinGameForm } from '../components/JoinGameForm';

export const JoinGame: React.FC = () => {
  const navigate = useNavigate();

  const handleJoinGame = (gameCode: string, username: string) => {
    // TODO: Initialize socket connection and join game
    navigate(`/game/${gameCode}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Join Bingo Game</h1>
        <JoinGameForm onSubmit={handleJoinGame} />
      </div>
    </div>
  );
};