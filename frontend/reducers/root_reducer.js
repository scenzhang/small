import { combineReducers } from 'redux';
import errors from './error_reducer';
import session from './session_reducer';
import entities from './entities_reducer'
import ui from './ui_reducer';
const RootReducer = combineReducers({
  session, errors, entities, ui
});

export default RootReducer;