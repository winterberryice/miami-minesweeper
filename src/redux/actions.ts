import { NEW_GAME, CELL_CLICK } from './actionTypes';
import { Action } from './reducers/rootReducer';
import { CellProps } from '../components/Cell';

export const newGame = (): Action => ({
  type: NEW_GAME,
});

export const cellClick = (cellState: CellProps): Action => ({
  type: CELL_CLICK,
  payload: cellState,
});
