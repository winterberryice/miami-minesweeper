import { BoardState, CellState, CellStatus } from './components/Board';

const DEBUG = true;

function logger(...args: unknown[]): void {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

function getInitialState(boardSize: number, mines: number): BoardState {
  const cells: CellState[][] = [];

  function fillCells(): void {
    for (let row = 0; row < boardSize; row += 1) {
      cells[row] = [];
      for (let column = 0; column < boardSize; column += 1) {
        cells[row][column] = {
          status: CellStatus.default,
          mine: false,
        };
      }
    }
  }

  function getRandomCell(): CellState {
    const row = Math.floor(Math.random() * cells.length);
    const column = Math.floor(Math.random() * cells[row].length);
    return cells[row][column];
  }

  function getNonMinedCell(): CellState {
    let cell = getRandomCell();
    let counter = 0;

    while (cell.mine) {
      cell = getRandomCell();
      counter += 1;
    }

    logger('iterations: ', counter);

    return cell;
  }

  function randomizeCells(): void {
    for (let i = 0; i < mines; i += 1) {
      getNonMinedCell().mine = true;
    }
  }

  fillCells();
  randomizeCells();

  logger('cells', cells);

  return { cells, mines, size: boardSize };
}

export { logger, getInitialState };
