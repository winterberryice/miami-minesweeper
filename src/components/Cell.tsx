import React from 'react';
import { useDispatch } from 'react-redux';
import { CellState, CellStatus } from './Board';
import { logger } from '../utils';
import { cellClick } from '../redux/actions';

const CELL_SIZE = '40px';

export interface CellProps {
  row: number;
  column: number;
  cellState: CellState;
}

export default function Cell({
  row,
  column,
  cellState,
}: CellProps): JSX.Element {
  const dispatch = useDispatch();

  function render(): JSX.Element {
    function getBackground(): string {
      if (cellState.mine) {
        return 'bg-red-500 hover:bg-red-600';
      }
      return 'bg-green-500 hover:bg-green-600';
    }

    function printStatus(): string {
      if (cellState.status === CellStatus.default) {
        return '';
      }
      if (
        cellState.status === CellStatus.clear &&
        cellState.proximityMines > 0
      ) {
        return cellState.proximityMines.toString();
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
              logger(
                'row: ',
                row,
                ' col: ',
                column,
                ' cell state: ',
                cellState,
              );
              dispatch(
                cellClick({
                  row,
                  column,
                  cellState,
                }),
              );
              // onClick(cellState);
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
