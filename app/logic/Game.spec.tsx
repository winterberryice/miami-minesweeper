import { renderHook } from "@testing-library/react";
import { IBoardCreator, useGame } from "./Game";

describe("Game", () => {
  test("should have board with 4 cells", () => {
    let boardSize = 2;

    const boardCreator: IBoardCreator = {
      createBoard() {
        return [
          [
            { row: 0, column: 0 },
            { row: 0, column: 1 },
          ],
          [
            { row: 1, column: 0 },
            { row: 1, column: 1 },
          ],
        ];
      },
    };

    const { result } = renderHook(() => useGame({ boardCreator, boardSize }));

    expect(result.current.board.flatMap((item) => item).length).toBe(4);
  });
});
