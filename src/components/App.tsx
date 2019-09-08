import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Board from './Board';
import Button from './Button';
import store from '../redux/store';
import { newGame } from '../redux/actions';
import { getRemainingFlags } from '../redux/selectors';
import Flag from './icons/flag';

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

function Main(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className="p-2">
      <div className="flex justify-center items-center py-2">
        <FlagIndicator />
        <Button
          onClick={(): void => {
            dispatch(newGame());
          }}
        >
          New game
        </Button>
      </div>
      <div className="flex">
        <Board />
      </div>
    </div>
  );
}
