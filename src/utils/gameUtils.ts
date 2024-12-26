export const generateBingoCard = (): number[][] => {
  const card: number[][] = [];
  const usedNumbers = new Set<number>();

  for (let col = 0; col < 5; col++) {
    const column: number[] = [];
    const min = col * 15 + 1;
    const max = min + 14;

    while (column.length < 5) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!usedNumbers.has(num)) {
        usedNumbers.add(num);
        column.push(num);
      }
    }
    card.push(column);
  }

  // Set middle square as free space
  card[2][2] = 0; // 0 represents FREE
  return card;
};

export const checkWin = (card: number[][], calledNumbers: number[], gameType: GameType): boolean => {
  const isNumberCalled = (num: number) => num === 0 || calledNumbers.includes(num);

  // Regular bingo - any row, column, or diagonal
  const checkRegular = () => {
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (card[i].every(num => isNumberCalled(num))) return true;
    }

    // Check columns
    for (let i = 0; i < 5; i++) {
      if (card.every(row => isNumberCalled(row[i]))) return true;
    }

    // Check diagonals
    const diagonal1 = Array(5).fill(0).every((_, i) => isNumberCalled(card[i][i]));
    const diagonal2 = Array(5).fill(0).every((_, i) => isNumberCalled(card[i][4 - i]));

    return diagonal1 || diagonal2;
  };

  switch (gameType) {
    case 'regular':
      return checkRegular();
    case 'postage':
      return [0, 1].every(i => 
        [0, 1].every(j => isNumberCalled(card[i][j])));
    case 'picture-frame':
      return card[0].every(num => isNumberCalled(num)) && // Top
             card[4].every(num => isNumberCalled(num)) && // Bottom
             [1, 2, 3].every(row => isNumberCalled(card[row][0]) && isNumberCalled(card[row][4])); // Sides
    case 'blackout':
      return card.every(row => row.every(num => isNumberCalled(num)));
    default:
      return false;
  }
};