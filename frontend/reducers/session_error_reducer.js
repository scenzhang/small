
import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER, CLEAR_ERRORS } from '../actions/session_actions.js'

const defaultState = [];

const SessionErrorReducer = (state = defaultState, action) => {
  const newState = Object.assign([], state)
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS: {
      return action.errors;
    }
    case RECEIVE_CURRENT_USER: {
      return [];
    }
    case CLEAR_ERRORS: {
      return [];
    }
    default: {
      return state;
    }
  }
}
export default SessionErrorReducer;