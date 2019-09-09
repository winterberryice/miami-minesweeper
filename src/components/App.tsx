import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Board from './Board';
import Button from './Button';
import store from '../redux/store';
import { newGame } from '../redux/actions';
import { getRemainingFlags, getElapsedSeconds } from '../redux/selectors';
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
      <div style={{ height: '20px', width: '20px' }}>
        <Timer />
      </div>
      <div className="pl-2">{elapsedTime}</div>
    </div>
  );
}

function Header(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center p-2">
      <div className="flex-1">
        <FlagIndicator />
      </div>
      <Button
        onClick={(): void => {
          dispatch(newGame());
        }}
      >
        New game
      </Button>
      <div className="flex-1">
        <TimerIndicator />
      </div>
    </div>
  );
}

function Main(): JSX.Element {
  return (
    <div className="p-2 flex flex-col">
      <div className="flex flex-col mx-auto">
        <Header />
        <Board />
      </div>
    </div>
  );
}
