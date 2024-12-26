import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Game } from '../types/game';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const useSocket = () => {
  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io(SOCKET_URL);
    
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const createGame = (gameId: string, gameType: string, hostName: string) => {
    socket.current?.emit('create_game', {
      gameId,
      gameType,
      hostId: socket.current.id,
      hostName
    });
  };

  const joinGame = (gameId: string, playerName: string) => {
    socket.current?.emit('join_game', {
      gameId,
      playerId: socket.current.id,
      playerName
    });
  };

  const startGame = (gameId: string) => {
    socket.current?.emit('start_game', gameId);
  };

  const callNumber = (gameId: string, number: number) => {
    socket.current?.emit('call_number', { gameId, number });
  };

  const claimBingo = (gameId: string) => {
    socket.current?.emit('claim_bingo', {
      gameId,
      playerId: socket.current.id
    });
  };

  const onGameUpdate = (callback: (game: Game) => void) => {
    socket.current?.on('game_updated', callback);
  };

  const onGameWon = (callback: (data: { gameId: string, winner: any }) => void) => {
    socket.current?.on('game_won', callback);
  };

  return {
    createGame,
    joinGame,
    startGame,
    callNumber,
    claimBingo,
    onGameUpdate,
    onGameWon
  };
};