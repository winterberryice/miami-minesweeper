import { act, renderHook } from "@testing-library/react";
import { useGame, UseGameProps } from "./Game";
import { BoardCreator_Size_4_Mines_2 } from "./TestUtils";
import { Status } from "./types";

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

  test(`click on cell with proximity mines 0 should open any neighboring cells,
      if neighbor cell is proximity 0 then open recursively`, () => {
    const { result } = renderHook(() => useGame(testingProps_board_4x4));

    act(() => {
      result.current.onCellClick({ row: 0, column: 3 });
    });

    const openedCells = result.current.board
      .flatMap((item) => item)
      .filter((cell) => {
        return (
          cell.row === 2 ||
          cell.row === 3 ||
          cell.column === 2 ||
          cell.column === 3
        );
      });

    expect(openedCells.length).toBe(12);
    expect(openedCells.every((cell) => cell.status === Status.OPEN)).toBe(true);
  });

  test("should show flag when right clicked", () => {
    const { result } = renderHook(() => useGame(testingProps_board_4x4));

    const flaggedCellsCount = function () {
      return result.current.board
        .flatMap((item) => item)
        .filter((cell) => cell.status === Status.FLAG).length;
    };

    act(() => {
      result.current.onFlagClick({ row: 2, column: 3 });
    });

    expect(flaggedCellsCount()).toBe(1);

    act(() => {
      result.current.onFlagClick({ row: 2, column: 2 });
    });

    expect(flaggedCellsCount()).toBe(2);

    act(() => {
      result.current.onFlagClick({ row: 2, column: 2 });
    });

    expect(flaggedCellsCount()).toBe(1);
  });

  test("should allow double click", () => {
    const { result } = renderHook(() => useGame(testingProps_board_4x4));

    act(() => {
      result.current.onCellClick({ row: 2, column: 2 });
    });
    act(() => {
      result.current.onFlagClick({ row: 1, column: 1 });
    });
    act(() => {
      result.current.onDoubleClick({ row: 2, column: 2 });
    });

    const openedCells = result.current.board
      .flatMap((item) => item)
      .filter((cell) => {
        return cell.status === Status.OPEN;
      });

    expect(openedCells.length).toBe(12);
  });

  test("should end game when mine is clicked", () => {
    const { result } = renderHook(() => useGame(testingProps_board_4x4));

    act(() => {
      result.current.onCellClick({ row: 1, column: 1 });
    });

    const gameState = result.current.gameState;

    expect(gameState).toBeDefined();
    expect(gameState.gameOver).toBe(true);
  });
});
