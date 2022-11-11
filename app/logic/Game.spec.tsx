import { act, renderHook } from "@testing-library/react";
import { useGame, UseGameProps } from "./Game";

describe("Game", () => {
  const testingProps_board_2x2: UseGameProps = {
    boardSize: 2,
    boardCreator: {
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
    },
  };

  test("should have board with 4 cells", () => {
    const { result } = renderHook(() => useGame(testingProps_board_2x2));

    expect(result.current.board.flatMap((item) => item).length).toBe(4);
  });

  test("should have board with mines", () => {
    const { result } = renderHook(() => useGame(testingProps_board_2x2));

    act(() => {
      result.current.start();
    });

    //TODO expect
  });
});
