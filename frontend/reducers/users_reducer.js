
import { merge } from 'lodash'
import { RECEIVE_USER, LOAD_USER } from '../actions/user_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
const UsersReducer = (state={}, action) => {
  const newState = merge({}, state);
  
  switch(action.type) {
    case RECEIVE_USER:
      newState[action.user.id] = action.user;
      return newState;
    
    case RECEIVE_CURRENT_USER:
    if (action.user) newState[action.user.id] = action.user;
    default:
      return state;
  }


}
export default UsersReducer;