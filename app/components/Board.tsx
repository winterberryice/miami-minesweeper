import { useGame } from "app/logic/Game";

type BoardProps = {
  game: ReturnType<typeof useGame>;
};

export function Board({ game }: BoardProps) {
  return (
    <div>
      {game.board.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <span key={cellIndex}>cell</span>
          ))}
        </div>
      ))}
    </div>
  );
}
