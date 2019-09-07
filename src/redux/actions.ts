import { NEW_GAME, CELL_CLICK } from './actionTypes';
import { CellProps, Action } from '../types';

export const newGame = (): Action => ({
  type: NEW_GAME,
});

export const cellClick = (cellState: CellProps): Action => ({
  type: CELL_CLICK,
  payload: cellState,
});
