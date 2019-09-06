import React from 'react';
import Board from './Board';

export default function Main(): JSX.Element {
  return (
    <div className="p-2">
      <div className="flex">
        <Board size={10} />
      </div>
    </div>
  );
}
