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

export const getElapsedSeconds = (store: BoardState): number => {
  return store.elapsedSeconds;
};

export const getMovesCount = (store: BoardState): number => {
  return store.moves;
};

export const getIsGameOver = (store: BoardState): boolean => {
  return store.gameOverInfo.gameOver;
};

export const getGameOverStatus = (store: BoardState): '' | 'win' | 'lose' => {
  return store.gameOverInfo.status;
};
