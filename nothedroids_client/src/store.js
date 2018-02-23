import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as actions from './actions'
import rootReducer from './reducers';
import { loadAuthToken, loadState, saveState } from './local-storage';

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(actions.setAuthToken(token));
    store.dispatch(actions.refreshAuthToken());
}

export default store;