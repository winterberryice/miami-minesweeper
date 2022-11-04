import {
  NEW_GAME,
  CELL_CLICK,
  FLAG_CLICK,
  INCREMENT_ELAPSED_SECONDS,
} from './actionTypes';
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

export const incrementElapsedSeconds = (second: number): Action => ({
  type: INCREMENT_ELAPSED_SECONDS,
  payload: second,
});
