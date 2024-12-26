import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, UserPlus } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Virtual Bingo
        </h1>
        
        <div className="space-y-4">
          <Link
            to="/create"
            className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={24} />
            <span className="font-semibold">Create Game</span>
          </Link>
          
          <Link
            to="/join"
            className="flex items-center justify-center gap-3 w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <UserPlus size={24} />
            <span className="font-semibold">Join Game</span>
          </Link>
        </div>
      </div>
    </div>
  );
};