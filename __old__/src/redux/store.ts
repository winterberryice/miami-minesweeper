import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { logger } from '../utils';

const store = createStore(rootReducer);

store.subscribe(() => {
  logger('state', store.getState());
});

export default store;
