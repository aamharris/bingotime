import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateGame } from './pages/CreateGame';
import { JoinGame } from './pages/JoinGame';
import { GameRoom } from './pages/GameRoom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateGame />} />
          <Route path="/join" element={<JoinGame />} />
          <Route path="/game/:gameId" element={<GameRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;