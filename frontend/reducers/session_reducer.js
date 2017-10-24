
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

const defaultState = Object.freeze({ currentUser: null });
const SessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER: {
      const newState = Object.assign({}, state);
      newState.currentUser = action.user;
      return newState;
    }
    default: {
      return state;
    }
  }
}
export default SessionReducer;