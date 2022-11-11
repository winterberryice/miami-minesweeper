import React from "react";

type Cell = { row: number; column: number };
type Board = Cell[][];

export interface IBoardCreator {
  createBoard(boardSize: number): Board;
}

export type UseGameProps = {
  boardSize: number;
  boardCreator: IBoardCreator;
};

export function useGame({ boardCreator, boardSize }: UseGameProps) {
  const [board, setBoard] = React.useState<Board>([]);

  React.useEffect(() => {
    setBoard(boardCreator.createBoard(boardSize));
  }, [boardCreator, boardSize]);

  function start() {
    setBoard(boardCreator.createBoard(boardSize));
  }

  function onCellClick() {}
  function onFlagClick() {}

  return {
    board,
    start,
    onCellClick,
    onFlagClick,
  };
}
