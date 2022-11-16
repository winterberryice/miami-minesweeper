import React from "react";
import { Board, Cell, CellCoords, IBoardCreator, Status } from "./types";

export type UseGameProps = {
  boardSize: number;
  mines: number;
  boardCreator: IBoardCreator;
};

function getNewBoard(
  board: Board,
  coords: CellCoords,
  callback: (cell: Cell) => Cell
): Board {
  return board.map((row) =>
    row.map((cell) => {
      if (cell.column === coords.column && cell.row === coords.row) {
        return callback(cell);
      }
      return cell;
    })
  );
}

function copyBoard(board: Board): Board {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export function useGame({ boardCreator, boardSize, mines }: UseGameProps) {
  const [board, setBoard] = React.useState<Board>([]);

  React.useEffect(() => {
    setBoard(boardCreator.createBoard(boardSize, mines));
  }, [boardCreator, boardSize, mines]);

  function start() {
    setBoard(boardCreator.createBoard(boardSize, mines));
  }

  function onCellClick(cellCoords: CellCoords) {
    const draftBoard = copyBoard(board);
    cellClickAction(cellCoords);
    setBoard(draftBoard);

    function cellClickAction({ row, column }: CellCoords) {
      const cell = draftBoard[row][column];

      if (cell.status !== Status.DEFAULT) {
        return;
      }

      cell.status = Status.OPEN;

      if (cell.proximityMines === 0) {
        PEERS.forEach((peer) => {
          const peerRow = row + peer.row;
          const peerColumn = column + peer.column;

          if (draftBoard[peerRow] && draftBoard[peerRow][peerColumn]) {
            cellClickAction({
              row: peerRow,
              column: peerColumn,
            });
          }
        });
      }
    }
  }

  function onFlagClick() {}

  return {
    board,
    start,
    onCellClick,
    onFlagClick,
  };
}

const PEERS = [
  { row: -1, column: -1 },
  { row: -1, column: 0 },
  { row: -1, column: 1 },
  { row: 0, column: 1 },
  { row: 1, column: 1 },
  { row: 1, column: 0 },
  { row: 1, column: -1 },
  { row: 0, column: -1 },
];

class GameBoardCreator implements IBoardCreator {
  public createBoard(boardSize: number, mines: number): Board {
    const board: Board = [];

    fillCells();
    fillMines();
    fillProximityMines();

    return board;

    function fillCells() {
      for (let row = 0; row < boardSize; row++) {
        board[row] = [];
        for (let column = 0; column < boardSize; column++) {
          board[row][column] = {
            row,
            column,
            status: Status.DEFAULT,
            mine: false,
            proximityMines: 0,
          };
        }
      }
    }

    function fillMines() {
      function getNonMinedCell(): Cell {
        function getRandomCell(): Cell {
          const row = Math.floor(Math.random() * board.length);
          const column = Math.floor(Math.random() * board[row].length);
          return board[row][column];
        }

        let cell = getRandomCell();

        while (cell.mine) {
          cell = getRandomCell();
        }

        return cell;
      }

      for (let i = 0; i < mines; i += 1) {
        getNonMinedCell().mine = true;
      }
    }

    function fillProximityMines() {
      for (let row = 0; row < boardSize; row += 1) {
        for (let column = 0; column < boardSize; column += 1) {
          let proximityMines = 0;

          PEERS.forEach((peer) => {
            if (
              board[row + peer.row] &&
              board[row + peer.row][column + peer.column] &&
              board[row + peer.row][column + peer.column].mine
            ) {
              proximityMines += 1;
            }
          });

          board[row][column].proximityMines = proximityMines;
        }
      }
    }
  }
}
