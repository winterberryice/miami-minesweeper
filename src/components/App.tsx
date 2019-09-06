import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import Board from './Board';
import Button from './Button';
import store from '../redux/store';
import { newGame } from '../redux/actions';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

function Main(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className="p-2">
      <div className="flex justify-center py-2">
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
