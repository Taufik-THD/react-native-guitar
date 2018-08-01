import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers';

const initialState = {
  user: {
    fullname: '',
    email: '',
    courses: {
      practice: [],
    },
  },
  isLoading: false,
  allChords: [],
  scales: [],
};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
