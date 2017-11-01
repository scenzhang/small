import {
  RECEIVE_RESPONSES,
  RECEIVE_RESPONSE,
  REMOVE_RESPONSE,
} from '../actions/response_actions';
import {
  merge
} from 'lodash';
import { RECEIVE_USER } from '../actions/user_actions';


const ResponsesReducer = (state = {}, action) => {
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_RESPONSES:
      {
        action.responses.forEach((resp) => {
          newState[resp.id] = resp;
        });
        return newState;
      }
    case RECEIVE_RESPONSE:
      {
        newState[action.response.id] = action.response;
        return newState;
      }
    case REMOVE_RESPONSE:
      {
        delete newState[action.id];
        return newState;
      }
    case RECEIVE_USER: {
      action.user.responses.forEach((resp) => {
          newState[resp.id] = resp;
        });
        return newState;
    }
    default:
      {
        return state;
      }

  }

}

export default ResponsesReducer;