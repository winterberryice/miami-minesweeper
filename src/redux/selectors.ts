import { BoardState, CellState } from '../types';

export const getCells = (store: BoardState): CellState[][] => {
  return store.cells;
};

export const getSize = (store: BoardState): number => {
  return store.size;
};

export const getRemainingFlags = (store: BoardState): number => {
  return store.remainingFlags;
};
