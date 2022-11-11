import React from "react";

type Cell = { row: number; column: number };
type Board = Cell[][];

export interface IBoardCreator {
  createBoard(boardSize: number): Board;
}

type UseGameProps = {
  boardSize: number;
  boardCreator: IBoardCreator;
};

export function useGame({ boardCreator, boardSize }: UseGameProps) {
  const [board, setBoard] = React.useState<Board>([]);

  React.useEffect(() => {
    setBoard(boardCreator.createBoard(boardSize));
  }, [boardCreator, boardSize]);

  return {
    board,
  };
}
