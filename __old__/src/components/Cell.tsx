import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logger } from '../utils';
import { cellClick, flagClick } from '../redux/actions';
import { CellProps, CellStatus } from '../types';
import Flag from './icons/Flag';
import Bomb from './icons/Bomb';
import { getIsGameOver } from '../redux/selectors';
import Cancel from './icons/Cancel';

export default function Cell({
  row,
  column,
  cellState,
  onClick,
}: CellProps): JSX.Element {
  const dispatch = useDispatch();
  const isGameOver = useSelector(getIsGameOver);

  function render(): JSX.Element {
    function getBackground(): string {
      if (cellState.status === CellStatus.gameEndingCell) {
        return 'bg-red-500 ';
      }
      if (
        cellState.status === CellStatus.default ||
        cellState.status === CellStatus.flag ||
        cellState.status === CellStatus.wrongFlag ||
        (cellState.status === CellStatus.open && cellState.mine)
      ) {
        return 'bg-green-500 hover:bg-green-600';
      }
      return 'border-2 border-green-500';
    }

    function printStatus(): string | JSX.Element {
      if (
        (cellState.status === CellStatus.open && cellState.mine) ||
        cellState.status === CellStatus.gameEndingCell
      ) {
        return (
          <div style={{ height: '20px', width: '20px' }}>
            <Bomb />
          </div>
        );
      }
      if (cellState.status === CellStatus.default) {
        return '';
      }
      if (
        cellState.status === CellStatus.open &&
        cellState.proximityMines > 0
      ) {
        return cellState.proximityMines.toString();
      }
      if (cellState.status === CellStatus.flag) {
        return (
          <div style={{ height: '20px', width: '20px' }}>
            <Flag />
          </div>
        );
      }
      if (cellState.status == CellStatus.wrongFlag) {
        return (
          <div className="relative">
            <div style={{ height: '20px', width: '20px' }}>
              <Flag />
            </div>
            <div
              className="absolute inset-0"
              style={{ height: '20px', width: '20px' }}
            >
              <Cancel />
            </div>
          </div>
        );
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
        }}
        className="relative cell-size"
      >
        <div
          className="absolute inset-0 border-2 
        border-transparent rounded overflow-hidden"
        >
          <button
            disabled={isGameOver}
            type="button"
            className={[
              getBackground(),
              'h-full w-full',
              'outline-none focus:outline-none',
              'flex items-center justify-center',
            ].join(' ')}
            onContextMenu={(e): void => {
              e.preventDefault();
              dispatch(flagClick({ row, column }));
            }}
            onClick={(): void => {
              if (onClick) {
                onClick();
              }
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
                }),
              );
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
