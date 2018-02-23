import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import viewReducer from './views';
import protectedDataReducer from './protected-data';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  view: viewReducer,
  protectedData: protectedDataReducer,
});

export default rootReducer;