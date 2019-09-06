import React from 'react';
import { BoardState } from '../components/Board';

const AppContext = React.createContext<BoardState>({} as BoardState);

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;
