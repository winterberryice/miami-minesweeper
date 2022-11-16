export type Coordinates = {
  row: number;
  column: number;
};

export enum Status {
  DEFAULT = "DEFAULT",
  OPEN = "OPEN",
  FLAG = "FLAG",
  WRONG_FLAG = "WRONG_FLAG",
  GAME_ENDING_CELL = "GAME_ENDING_CELL",
}

export type Cell = {
  row: number;
  column: number;
  proximityMines: number;
  mine: boolean;
  status: Status;
};

export type Board = Cell[][];

export interface IBoardCreator {
  createBoard(boardSize: number, mines: number): Board;
}

export type CellCoords = {
  row: number;
  column: number;
};
