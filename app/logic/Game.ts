import React from "react";

type Params = {
  boardSize: number;
  mines: number;
};

export class Game {
  private boardSize: number;
  private mines: number;

  constructor({ boardSize, mines }: Params) {
    this.boardSize = boardSize;
    this.mines = mines;
  }

  start() {}
}

type Cell = { row: number; column: number };

export function useGame(boardSize: number) {
  const [board, setBoard] = React.useState<Cell[][]>([]);

  React.useEffect(() => {
    let newBoard: Cell[][] = [];

    for (let i = 0; i < boardSize; i++) {
      newBoard[i] = [];
      for (let j = 0; j < boardSize; j++) {
        newBoard[i][j] = { row: i, column: j };
      }
    }

    setBoard(newBoard);
  }, [boardSize]);

  return {
    board,
  };
}
