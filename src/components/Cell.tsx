import React from 'react';
import { CellState, CellStatus } from './Board';
import { logger } from '../utils';

const CELL_SIZE = '40px';

interface CellProps {
  row: number;
  column: number;
  cellState: CellState;
  onClick: (cellState: CellState) => void;
}

export default function Cell({
  row,
  column,
  cellState,
  onClick,
}: CellProps): JSX.Element {
  function render(): JSX.Element {
    function getBackground(): string {
      if (cellState.mine) {
        return 'bg-red-500 hover:bg-red-600';
      }
      return 'bg-green-500 hover:bg-green-600';
    }

    function printStatus(): string {
      if (cellState.mine) {
        return '*';
      }
      if (cellState.status === CellStatus.flag) {
        return 'f';
      }

      return '';
    }

    return (
      <div
        key={`${row}${column}`}
        style={{
          gridColumn: column + 1,
          gridRow: row + 1,
          alignSelf: 'stretch',
          height: CELL_SIZE,
          width: CELL_SIZE,
        }}
        className="relative "
      >
        <div className="absolute inset-0 border-2 border-transparent rounded overflow-hidden">
          <button
            type="button"
            className={[getBackground(), ' h-full w-full'].join(' ')}
            onClick={(): void => {
              logger('row: ', row, ' col: ', column);
              onClick(cellState);
            }}
          >
            {printStatus()}
          </button>
        </div>
      </div>
    );
  }
  return render();
}
