import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cell from './Cell';
import {
  getCells,
  getSize,
  getMovesCount,
  getIsGameOver,
} from '../redux/selectors';
import { CellState, IntervalState } from '../types';
import useInterval from '../hooks/useInterval';
import { incrementElapsedSeconds } from '../redux/actions';

export default function Board(): JSX.Element {
  const cells = useSelector(getCells);
  const size = useSelector(getSize);
  const moves = useSelector(getMovesCount);
  const isGameOver = useSelector(getIsGameOver);
  const dispatch = useDispatch();
  const [intervalState, setIntervalState] = React.useState<IntervalState>({
    delay: null,
    timerStarted: false,
  });

  useInterval((): void => {
    dispatch(incrementElapsedSeconds(1));
  }, intervalState.delay);

  React.useEffect(() => {
    if (moves === 0 || isGameOver) {
      // 'listen' to new game event,
      // clear interval etc.
      setIntervalState({
        delay: null,
        timerStarted: false,
      });
    }
  }, [moves, isGameOver]);

  function cellClick(): void {
    if (!intervalState.timerStarted) {
      setIntervalState({
        delay: 1000,
        timerStarted: true,
      });
    }
  }

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
            onClick={cellClick}
          />,
        );
      }
    }

    return (
      <div className="board-element relative">
        <div
          style={{ display: 'grid' }}
          className="bg-green-400 rounded shadow"
        >
          {boardCells}
        </div>

        {isGameOver && (
          <div className="game-over-overlay absolute rounded inset-0" />
        )}
      </div>
    );
  }

  return render();
}
