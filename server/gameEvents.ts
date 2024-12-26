import { Server, Socket } from 'socket.io';
import { Game, Player } from '../src/types/game';

export const handleGameEvents = (io: Server, socket: Socket, games: Map<string, Game>) => {
  // Create game
  socket.on('create_game', ({ gameId, gameType, hostId, hostName }) => {
    const game: Game = {
      id: gameId,
      type: gameType,
      host: hostId,
      players: [{
        id: hostId,
        name: hostName,
        card: generateBingoCard()
      }],
      calledNumbers: [],
      status: 'lobby'
    };
    
    games.set(gameId, game);
    socket.join(gameId);
    io.to(gameId).emit('game_updated', game);
  });

  // Join game
  socket.on('join_game', ({ gameId, playerId, playerName }) => {
    const game = games.get(gameId);
    if (!game) {
      socket.emit('error', 'Game not found');
      return;
    }

    const newPlayer: Player = {
      id: playerId,
      name: playerName,
      card: generateBingoCard()
    };

    game.players.push(newPlayer);
    socket.join(gameId);
    io.to(gameId).emit('game_updated', game);
  });

  // Start game
  socket.on('start_game', (gameId) => {
    const game = games.get(gameId);
    if (!game) return;

    game.status = 'playing';
    io.to(gameId).emit('game_updated', game);
  });

  // Call number
  socket.on('call_number', ({ gameId, number }) => {
    const game = games.get(gameId);
    if (!game) return;

    game.calledNumbers.push(number);
    io.to(gameId).emit('game_updated', game);
  });

  // Claim bingo
  socket.on('claim_bingo', ({ gameId, playerId }) => {
    const game = games.get(gameId);
    if (!game) return;

    const player = game.players.find(p => p.id === playerId);
    if (!player) return;

    // Verify win
    const isWin = checkWin(player.card, game.calledNumbers, game.type);
    if (isWin) {
      game.status = 'finished';
      io.to(gameId).emit('game_won', { gameId, winner: player });
    }
  });

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    games.forEach((game, gameId) => {
      game.players = game.players.filter(p => p.id !== socket.id);
      if (game.players.length === 0) {
        games.delete(gameId);
      } else {
        io.to(gameId).emit('game_updated', game);
      }
    });
  });
};