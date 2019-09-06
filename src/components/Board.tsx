import React from 'react';
import Cell from './Cell';

interface BoardProps {
  size: number;
}

enum CellStatus {
  default = 'default',
  flag = 'flag',
}

export interface CellState {
  status: CellStatus;
  mine: boolean;
}

interface BoardState {
  cells: CellState[][];
}

export default function Board({ size }: BoardProps): JSX.Element {
  function getInitialState(boardSize: number): BoardState {
    const cells: CellState[][] = [];

    for (let row = 0; row < size; row += 1) {
      cells[row] = [];
      for (let column = 0; column < size; column += 1) {
        cells[row][column] = {
          status: CellStatus.default,
          mine: false,
        };
      }
    }

    cells[3][7].mine = true;

    console.log('cells', cells);

    return { cells };
  }

  const [state, setState] = React.useState(getInitialState(size));

  function getCellState(row: number, column: number): CellState {
    return state.cells[row][column];
  }

  function onCellClick(cellState: CellState): void {
    console.log('status: ', cellState.status, ' mine: ', cellState.mine);
  }

  function render(): JSX.Element {
    const cells = [];
    for (let row = 0; row < size; row += 1) {
      for (let column = 0; column < size; column += 1) {
        const cellState = getCellState(row, column);
        cells.push(
          <Cell
            key={`row${row}column${column}`}
            row={row}
            column={column}
            cellState={cellState}
            onClick={onCellClick}
          />,
        );
      }
    }

    return (
      <div style={{ display: 'grid' }} className="mx-auto bg-green-400">
        {cells}
      </div>
    );
  }

  return render();
}
