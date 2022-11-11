import { Board, IBoardCreator, Status } from "./types";

export class BoardCreator_Size_4_Mines_2 implements IBoardCreator {
  createBoard(boardSize: /*4*/ number, mines: /*2*/ number): Board {
    /**
      |2|2|1| |
      |x|x|1| |
      |2|2|1| |
      | | | | |
    */
    return [
      [
        {
          row: 0,
          column: 0,
          proximityMines: 2,
          mine: false,
          status: Status.DEFAULT,
        },
        {
          row: 0,
          column: 1,
          proximityMines: 2,
          mine: false,
          status: Status.DEFAULT,
        },
        {
          row: 0,
          column: 2,
          proximityMines: 1,
          mine: false,
          status: Status.DEFAULT,
        },
        {
          row: 0,
          column: 3,
          proximityMines: 0,
          mine: false,
          status: Status.DEFAULT,
        },
      ],
      [
        {
          row: 1,
          column: 0,
          proximityMines: 0,
          mine: true,
          status: Status.DEFAULT,
        },
        {
          row: 1,
          column: 1,
          proximityMines: 0,
          mine: true,
          status: Status.DEFAULT,
        },
        {
          row: 1,
          column: 2,
          proximityMines: 1,
          mine: false,
          status: Status.DEFAULT,
        },
        {
          row: 1,
          column: 3,
          proximityMines: 0,
          mine: false,
          status: Status.DEFAULT,
        },
      ],
      [
        {
          row: 2,
          column: 0,
          proximityMines: 2,
          mine: false,
          status: Status.DEFAULT,
        },
        {
          row: 2,
          column: 1,
          proximityMines: 2,
          mine: false,
          status: Status.DEFAULT,
        },
        {
          row: 2,
          column: 2,
          proximityMines: 1,
          mine: false,
          status: Status.DEFAULT,
        },
        {
          row: 2,
          column: 3,
          proximityMines: 0,
          mine: false,
          status: Status.DEFAULT,
        },
      ],
      [
        {
          row: 3,
          column: 0,
          proximityMines: 0,
          mine: false,
          status: Status.DEFAULT,
        },
        {
          row: 3,
          column: 1,
          proximityMines: 0,
          mine: false,
          status: Status.DEFAULT,
        },
        {
          row: 3,
          column: 2,
          proximityMines: 0,
          mine: false,
          status: Status.DEFAULT,
        },
        {
          row: 3,
          column: 3,
          proximityMines: 0,
          mine: false,
          status: Status.DEFAULT,
        },
      ],
    ];
  }
}
