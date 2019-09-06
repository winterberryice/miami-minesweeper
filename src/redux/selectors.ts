import { BoardState, CellState } from '../components/Board';

export const getCells = (store: BoardState): CellState[][] => {
  return store.cells;
};

export const getSize = (store: BoardState): number => {
  return store.size;
};
