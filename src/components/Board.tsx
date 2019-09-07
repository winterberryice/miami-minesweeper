import React from 'react';
import { useSelector } from 'react-redux';
import Cell from './Cell';
import { getCells, getSize } from '../redux/selectors';
import { CellState } from '../types';

export default function Board(): JSX.Element {
  const cells = useSelector(getCells);
  const size = useSelector(getSize);

  function getCellState(row: number, column: number): CellState {
    return cells[row][column];
  }

  function render(): JSX.Element {
    const boardCells = [];
    for (let row = 0; row < size; row += 1) {
      for (let column = 0; column < size; column += 1) {
        const cellState = getCellState(row, column);
        boardCells.push(
          <Cell
            key={`row${row}column${column}`}
            row={row}
            column={column}
            cellState={cellState}
          />,
        );
      }
    }

    return (
      <div
        style={{ display: 'grid' }}
        className="mx-auto bg-green-400 rounded shadow"
      >
        {boardCells}
      </div>
    );
  }

  return render();
}
