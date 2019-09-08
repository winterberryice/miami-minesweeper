import { NEW_GAME, CELL_CLICK, FLAG_CLICK } from './actionTypes';
import { Action, CellCoords } from '../types';

export const newGame = (): Action => ({
  type: NEW_GAME,
});

export const cellClick = (cellCoords: CellCoords): Action => ({
  type: CELL_CLICK,
  payload: cellCoords,
});

export const flagClick = (cellCoords: CellCoords): Action => ({
  type: FLAG_CLICK,
  payload: cellCoords,
});
