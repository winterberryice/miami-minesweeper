import produce from 'immer';
import {
  NEW_GAME,
  CELL_CLICK,
  FLAG_CLICK,
  INCREMENT_ELAPSED_SECONDS,
} from '../actionTypes';
import { logger } from '../../utils';
import {
  Action,
  BoardState,
  CellStatus,
  CellState,
  CellCoords,
} from '../../types';

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

function getInitialState(boardSize: number, mines: number): BoardState {
  const cells: CellState[][] = [];

  const stateBuilder = {
    fillCells: (): void => {
      for (let row = 0; row < boardSize; row += 1) {
        cells[row] = [];
        for (let column = 0; column < boardSize; column += 1) {
          cells[row][column] = {
            status: CellStatus.default,
            mine: false,
            proximityMines: 0,
          };
        }
      }
    },
    fillMines: (): void => {
      function getNonMinedCell(): CellState {
        function getRandomCell(): CellState {
          const row = Math.floor(Math.random() * cells.length);
          const column = Math.floor(Math.random() * cells[row].length);
          return cells[row][column];
        }

        let cell = getRandomCell();
        let counter = 0;

        while (cell.mine) {
          cell = getRandomCell();
          counter += 1;
        }

        logger('iterations: ', counter);

        return cell;
      }

      for (let i = 0; i < mines; i += 1) {
        getNonMinedCell().mine = true;
      }
    },
    fillProximityMines: (): void => {
      for (let row = 0; row < boardSize; row += 1) {
        for (let column = 0; column < boardSize; column += 1) {
          let proximityMines = 0;

          PEERS.forEach(peer => {
            if (
              cells[row + peer.row] &&
              cells[row + peer.row][column + peer.column] &&
              cells[row + peer.row][column + peer.column].mine
            ) {
              proximityMines += 1;
            }
          });

          cells[row][column].proximityMines = proximityMines;
        }
      }
    },
  };

  stateBuilder.fillCells();
  stateBuilder.fillMines();
  stateBuilder.fillProximityMines();

  return {
    cells,
    mines,
    size: boardSize,
    remainingFlags: mines,
    elapsedSeconds: 0,
    moves: 0,
    gameOver: false,
  };
}

const initialState = getInitialState(10, 10);

logger('initial state', initialState);

function revealAllMinesOnGameOver(draft: BoardState): void {
  draft.cells.forEach(row => {
    row.forEach(cell => {
      const aCell = cell;

      if (aCell.mine) {
        if (aCell.status == CellStatus.default) {
          aCell.status = CellStatus.open;
        }
      } else {
        if (aCell.status == CellStatus.flag) {
          aCell.status = CellStatus.wrongFlag;
        }
      }
    });
  });
}

function cellClickAction(draft: BoardState, { row, column }: CellCoords): void {
  const cell = draft.cells[row][column];

  if (cell.status !== CellStatus.default) {
    return;
  }
  if (cell.mine) {
    logger('game over');
    revealAllMinesOnGameOver(draft);
    cell.status = CellStatus.gameEndingCell;
    draft.gameOver = true;
    return;
  }

  cell.status = CellStatus.open;
  draft.moves += 1;

  if (cell.proximityMines === 0)
    PEERS.forEach(peer => {
      if (
        draft.cells[row + peer.row] &&
        draft.cells[row + peer.row][column + peer.column]
      ) {
        cellClickAction(draft, {
          row: row + peer.row,
          column: column + peer.column,
        });
      }
    });
}

function flagClickAction(draft: BoardState, { row, column }: CellCoords): void {
  const cell = draft.cells[row][column];

  if (cell.status === CellStatus.default) {
    cell.status = CellStatus.flag;
    draft.remainingFlags -= 1;
  } else if (cell.status === CellStatus.flag) {
    cell.status = CellStatus.default;
    draft.remainingFlags += 1;
  }
}

const rootReducer = (state = initialState, action: Action): BoardState =>
  produce(
    state,
    (draft): BoardState => {
      switch (action.type) {
        case NEW_GAME:
          return { ...getInitialState(10, 10) };
        case CELL_CLICK:
          cellClickAction(draft, action.payload as CellCoords);
          return draft;
        case FLAG_CLICK:
          flagClickAction(draft, action.payload as CellCoords);
          return draft;
        case INCREMENT_ELAPSED_SECONDS:
          draft.elapsedSeconds += action.payload as number;
          return draft;
        default:
          return draft;
      }
    },
  );

export default rootReducer;
