import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Game, Player } from '../types/game';
import { GameLobby } from '../components/GameLobby';
import { GameBoard } from '../components/GameBoard';
import { generateBingoCard } from '../utils/gameUtils';

export const GameRoom: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game>({
    id: gameId || '',
    type: 'regular',
    host: 'temp-host-id', // TODO: Replace with actual host ID from socket
    players: [],
    calledNumbers: [],
    status: 'lobby'
  });
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    id: 'temp-player-id', // TODO: Replace with actual player ID from socket
    name: 'Player',
    card: generateBingoCard()
  });
  const isHost = currentPlayer.id === game.host;

  const handleStartGame = () => {
    // TODO: Emit socket event to start game
    setGame(prev => ({ ...prev, status: 'playing' }));
  };

  const handleCallNumber = (number: number) => {
    // TODO: Emit socket event for called number
    setGame(prev => ({
      ...prev,
      calledNumbers: [...prev.calledNumbers, number]
    }));
  };

  const handleBingo = () => {
    // TODO: Emit socket event for bingo claim
    console.log('Bingo claimed!');
  };

  if (game.status === 'lobby') {
    return (
      <GameLobby
        game={game}
        onStartGame={handleStartGame}
        isHost={isHost}
      />
    );
  }

  return (
    <GameBoard
      game={game}
      player={currentPlayer}
      isHost={isHost}
      onCallNumber={handleCallNumber}
      onBingo={handleBingo}
    />
  );
};