import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_error_reducer';

const ErrorsReducer = combineReducers({
  session: SessionErrorsReducer
});

export default ErrorsReducer;