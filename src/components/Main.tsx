import React from 'react';
import Board from './Board';
import Button from './Button';
import { AppProvider } from '../store/AppContext';
import { getInitialState } from '../utils';

export default function App(): JSX.Element {
  const [state, setState] = React.useState(getInitialState(10, 10));

  return (
    <AppProvider value={state}>
      <Main
        newGame={(): void => {
          setState(getInitialState(10, 10)); // TODO: causing re-renders
        }}
      />
    </AppProvider>
  );
}

function Main({ newGame }: { newGame: () => void }): JSX.Element {
  return (
    <div className="p-2">
      <div className="flex justify-center py-2">
        <Button
          onClick={(): void => {
            newGame();
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
