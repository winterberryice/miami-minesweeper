import { Board, Header, Title } from "app/components";

export default function Page() {
  return (
    <main className="main-app-element p-2 flex flex-col">
      <div className="flex flex-col mx-auto">
        <Title />
        <Header />
        <Board />
      </div>
    </main>
  );
}
