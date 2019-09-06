import { NEW_GAME } from './actionTypes';
import { Action } from './reducers/rootReducer';

// eslint-disable-next-line import/prefer-default-export
export const newGame = (): Action => ({
  type: NEW_GAME,
});
