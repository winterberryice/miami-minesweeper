"use client";

import { Board, Header, Title } from "app/components";
import { GameBoardCreator, useGame } from "./logic/Game";

export default function Page() {
  const game = useGame({
    boardCreator: new GameBoardCreator(),
    boardSize: 8,
    mines: 10,
  });

  return (
    <main className="main-app-element p-2 flex flex-col">
      <div className="flex flex-col mx-auto">
        <Title />
        <Header />
        <Board game={game} />
      </div>
    </main>
  );
}
