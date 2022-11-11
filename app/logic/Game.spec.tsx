import { act, renderHook } from "@testing-library/react";
import { useGame, UseGameProps } from "./Game";
import { BoardCreator_Size_4_Mines_2 } from "./TestUtils";

describe("Game", () => {
  const testingProps_board_4x4: UseGameProps = {
    boardSize: 4,
    mines: 2,
    boardCreator: new BoardCreator_Size_4_Mines_2(),
  };

  test("should have board with 16 cells", () => {
    const { result } = renderHook(() => useGame(testingProps_board_4x4));

    expect(result.current.board.flatMap((item) => item).length).toBe(16);
  });

  test("should have board with mines", () => {
    const { result } = renderHook(() => useGame(testingProps_board_4x4));

    act(() => {
      result.current.start();
    });

    //TODO expect
  });
});
