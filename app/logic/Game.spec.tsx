import { renderHook } from "@testing-library/react";
import { Game, useGame } from "./Game";

describe("Game", () => {
  test("should be defined", () => {
    expect(Game).toBeDefined();
  });

  test("should have board with 100 cells", () => {
    let boardSize = 10;

    const { result, rerender } = renderHook(() => useGame(boardSize));
    //console.log(result.current.board[0][0]);
    expect(result.current.board.flatMap((item) => item).length).toBe(100);

    boardSize = 15;
    rerender();

    expect(result.current.board.flatMap((item) => item).length).toBe(15 * 15);
  });
});
