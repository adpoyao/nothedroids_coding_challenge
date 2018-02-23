import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import protectedDataReducer from './protected-data';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  protectedData: protectedDataReducer,
});

export default rootReducer;
