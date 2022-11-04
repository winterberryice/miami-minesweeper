import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Board from './Board';
import Button from './Button';
import store from '../redux/store';
import { newGame } from '../redux/actions';
import {
  getRemainingFlags,
  getElapsedSeconds,
  getIsGameOver,
  getGameOverStatus,
} from '../redux/selectors';
import Flag from './icons/Flag';
import Timer from './icons/Timer';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

function FlagIndicator(): JSX.Element {
  const remainingFlags = useSelector(getRemainingFlags);

  return (
    <div className="flex">
      <div style={{ height: '20px', width: '20px' }}>
        <Flag />
      </div>
      <div className="pl-2 pr-4">{remainingFlags}</div>
    </div>
  );
}

function TimerIndicator(): JSX.Element {
  const elapsedTime = useSelector(getElapsedSeconds);

  return (
    <div className="flex justify-end">
      <div className="pr-2">{elapsedTime}</div>
      <div style={{ height: '20px', width: '20px' }}>
        <Timer />
      </div>
    </div>
  );
}

function Header(): JSX.Element {
  const dispatch = useDispatch();
  const isGameOver = useSelector(getIsGameOver);
  const gameOverStatus = useSelector(getGameOverStatus);

  function contentEmoji(): string {
    if (isGameOver && gameOverStatus == 'lose') {
      return '😢';
    } else if (isGameOver && gameOverStatus == 'win') {
      return '😎';
    } else {
      return '😃';
    }
  }

  return (
    <div className="header-element flex justify-center items-center p-2">
      <div className="flex-1">
        <FlagIndicator />
      </div>

      <button
        className="rounded hover:bg-gray-700 leading-normal py-1 px-2"
        type="button"
        onClick={(): void => {
          dispatch(newGame());
        }}
      >
        {contentEmoji()}
      </button>

      <div className="flex-1">
        <TimerIndicator />
      </div>
    </div>
  );
}

function Title(): JSX.Element {
  return (
    <div className="title-element title-font text-5xl">
      <div className="flex justify-center">Miami</div>
      <div className="flex justify-center">Minesweeper</div>
    </div>
  );
}

function Main(): JSX.Element {
  return (
    <div className="main-app-element p-2 flex flex-col">
      <div className="flex flex-col mx-auto">
        <Title />
        <Header />
        <Board />
      </div>
    </div>
  );
}
