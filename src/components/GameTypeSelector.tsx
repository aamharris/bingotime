import React from 'react';
import { GameType } from '../types/game';
import { Layout, Grid2X2, Square, Monitor } from 'lucide-react';
import { clsx } from 'clsx';

interface GameTypeOption {
  type: GameType;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const gameTypes: GameTypeOption[] = [
  {
    type: 'regular',
    label: 'Regular',
    description: 'Any row, column, or diagonal',
    icon: <Layout className="w-6 h-6" />,
  },
  {
    type: 'postage',
    label: 'Postage',
    description: '2x2 square in any corner',
    icon: <Grid2X2 className="w-6 h-6" />,
  },
  {
    type: 'picture-frame',
    label: 'Picture Frame',
    description: 'Complete the outer edge',
    icon: <Square className="w-6 h-6" />,
  },
  {
    type: 'blackout',
    label: 'Blackout',
    description: 'Cover the entire card',
    icon: <Monitor className="w-6 h-6" />,
  },
];

interface GameTypeSelectorProps {
  selectedType: GameType;
  onTypeSelect: (type: GameType) => void;
}

export const GameTypeSelector: React.FC<GameTypeSelectorProps> = ({
  selectedType,
  onTypeSelect,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Select Game Type</h2>
      <div className="grid grid-cols-1 gap-3">
        {gameTypes.map(({ type, label, description, icon }) => (
          <button
            key={type}
            onClick={() => onTypeSelect(type)}
            className={clsx(
              'flex items-center gap-4 p-4 rounded-lg border-2 transition-all',
              selectedType === type
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
            )}
          >
            <div className={clsx(
              'p-2 rounded-lg',
              selectedType === type ? 'text-blue-600 bg-blue-100' : 'text-gray-600 bg-gray-100'
            )}>
              {icon}
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">{label}</div>
              <div className="text-sm text-gray-600">{description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};