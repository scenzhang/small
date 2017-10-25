import { combineReducers } from 'redux';

import session from './session_error_reducer';
import articles from './articles_error_reducer';

const ErrorsReducer = combineReducers({
  session, articles
});

export default ErrorsReducer;