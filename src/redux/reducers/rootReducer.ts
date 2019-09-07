import { NEW_GAME } from '../actionTypes';
import { BoardState, CellState, CellStatus } from '../../components/Board';
import { logger } from '../../utils';

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
      const peers = [
        { row: -1, column: -1 },
        { row: -1, column: 0 },
        { row: -1, column: 1 },
        { row: 0, column: 1 },
        { row: 1, column: 1 },
        { row: 1, column: 0 },
        { row: 1, column: -1 },
        { row: 0, column: -1 },
      ];

      for (let row = 0; row < boardSize; row += 1) {
        for (let column = 0; column < boardSize; column += 1) {
          let proximityMines = 0;

          peers.forEach(peer => {
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

  return { cells, mines, size: boardSize };
}

const initialState = getInitialState(10, 10);

logger('initial state', initialState);

export interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export default function(state = initialState, action: Action): BoardState {
  switch (action.type) {
    case NEW_GAME:
      return { ...getInitialState(10, 10) };
    default:
      return state;
  }
}
