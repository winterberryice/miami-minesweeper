/* eslint-disable import/prefer-default-export */

export interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export const enum CellStatus {
  default = 'default',
  open = 'open',
  flag = 'flag',
}

export interface CellState {
  status: CellStatus;
  mine: boolean;
  proximityMines: number;
}

export interface BoardState {
  cells: CellState[][];
  size: number;
  mines: number;
  remainingFlags: number;
  elapsedSeconds: number;
  moves: number;
  gameOver: boolean;
}

export interface CellProps {
  row: number;
  column: number;
  cellState: CellState;
  onClick: () => void;
}

export interface CellCoords {
  row: number;
  column: number;
}

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IntervalState {
  delay: number | null;
  timerStarted: boolean;
}
