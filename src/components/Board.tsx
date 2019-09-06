import React from 'react';
import Cell from './Cell';
import { logger } from '../utils';
import AppContext from '../store/AppContext';

export enum CellStatus {
  default = 'default',
  flag = 'flag',
}

export interface CellState {
  status: CellStatus;
  mine: boolean;
}

export interface BoardState {
  cells: CellState[][];
  size: number;
  mines: number;
}

export default function Board(): JSX.Element {
  // use setState in new game button
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [state, setState] = React.useState(getInitialState(size, mines));
  const state = React.useContext(AppContext);

  // console.log('store', appState);

  function getCellState(row: number, column: number): CellState {
    return state.cells[row][column];
  }

  function onCellClick(cellState: CellState): void {
    logger('status: ', cellState.status, ' mine: ', cellState.mine);
  }

  function render(): JSX.Element {
    const cells = [];
    for (let row = 0; row < state.size; row += 1) {
      for (let column = 0; column < state.size; column += 1) {
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
      <div
        style={{ display: 'grid' }}
        className="mx-auto bg-green-400 rounded shadow"
      >
        {cells}
      </div>
    );
  }

  return render();
}
