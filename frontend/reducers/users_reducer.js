<<<<<<< Updated upstream
=======
import { merge } from 'lodash'
import { RECEIVE_USER, LOAD_USER } from '../actions/user_actions';

const UsersReducer = (state={}, action) => {
  const newState = merge({}, state);
  
  switch(action.type) {
    case RECEIVE_USER:
      newState[action.user.id] = action.user;
      return newState;
    default:
      return state;
  }


}

export default UsersReducer;
>>>>>>> Stashed changes
