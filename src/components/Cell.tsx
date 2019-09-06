import React from 'react';
import { CellState } from './Board';

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
  // const { obj, bounds } = useMeasure<HTMLDivElement>();

  function render(): JSX.Element {
    return (
      <div
        // ref={obj.ref}
        key={`${row}${column}`}
        style={{
          gridColumn: column + 1,
          gridRow: row + 1,
          alignSelf: 'stretch',
          // height: bounds.width,
          height: CELL_SIZE,
          width: CELL_SIZE,
        }}
        className="relative "
      >
        <div className="absolute inset-0 border-2 rounded overflow-hidden">
          <button
            type="button"
            className="hover:bg-green-600 h-full w-full"
            onClick={(): void => {
              console.log('row: ', row, ' col: ', column);
              onClick(cellState);
            }}
          >
            {`${row} ${column}`}
          </button>
        </div>
      </div>
    );
  }
  return render();
}
