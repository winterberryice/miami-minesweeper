import { FlagIndicator } from "./FlagIndicator";
import { TimerIndicator } from "./TimerIndicator";

export function Header() {
  function contentEmoji(): string {
    // if (isGameOver && gameOverStatus == 'lose') {
    //   return '😢';
    // } else if (isGameOver && gameOverStatus == 'win') {
    //   return '😎';
    // } else
    {
      return "😃";
    }
  }

  return (
    <div className="header-element flex justify-center items-center p-2">
      <div className="flex-1">
        <FlagIndicator remainingFlags={10} />
      </div>

      <button
        className="rounded hover:bg-gray-700 leading-normal py-1 px-2"
        type="button"
        onClick={(): void => {
          // dispatch(newGame());
        }}
      >
        {contentEmoji()}
      </button>

      <div className="flex-1">
        <TimerIndicator elapsedTime={10} />
      </div>
    </div>
  );
}
