import {
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE,
  RECEIVE_ALL_ARTICLES,
  RECEIVE_ARTICLE
} from "../actions/article_actions";
import {
  LOAD_RESPONSE,
  LOAD_RESPONSES,
  RECEIVE_RESPONSE,
  RECEIVE_RESPONSES
} from '../actions/response_actions';
import {
  RECEIVE_CURRENT_USER
} from '../actions/session_actions';
import {
  RECEIVE_USER
} from '../actions/user_actions'
import {
  merge
} from 'lodash'
import loading from './loading_reducer'

const UIReducer = (state = {}, action) => {
  let newState = merge({}, state);
  newState.currResponses = newState.currResponses || [];
  switch (action.type) {
    case LOAD_ALL_ARTICLES:
      newState.article_loading = true;
      return newState;
    case LOAD_ARTICLE:
      newState.article_loading = true;
      return newState;
    case LOAD_RESPONSES:
      newState.response_loaded = false;
      newState.response_id = action.id;
      return newState;
    case LOAD_RESPONSE:
      newState.response_loaded = false;
      newState.response_id = action.id;
      return newState;

    case RECEIVE_ARTICLE:
      newState.currArticle = action.article.id;
      newState.article_loading = false;
      return newState;
    case RECEIVE_ALL_ARTICLES:
      newState.article_loading = false;
      if (!newState.toDisplay) newState.toDisplay = "ALL";
      // newState.toDisplay = [];
      // action.articles.forEach((article) => {
      //   newState.toDisplay.push(article.id);
      // }); 
      return newState;
    case RECEIVE_RESPONSES:
      newState.response_loaded = true;
      newState.currResponses = [];
      // 
      action.responses.forEach((res) => {
        // if (res.parent_response_id === null)// || !newState.currResponses.includes(res.parent_response_id))
        //   newState.currResponses.push(res.id)
        // 
        if (res.parent_response_id == newState.response_id) {
          newState.currResponses.push(res.id)
        }
      });
      newState.currResponses.sort((a, b) => a - b);

      // newState.response_id = null;
      return newState;
    case RECEIVE_RESPONSE:
      // 
      newState.response_loaded = true;
      if (action.response.parent_response_id == newState.response_id) // || !newState.currResponses.includes(action.response.parent_response_id))
        newState.currResponses.push(action.response.id)
      newState.currArticle = action.response.article_id
      newState.currResponses.sort((a, b) => a - b);
      // newState.response_id = null;
      return newState;
    case RECEIVE_CURRENT_USER:
      if (action.user) {
        newState.toDisplay = action.user.feedItems;
      } else {
        newState.toDisplay = 'ALL';
      }
      return newState;
    default:
      return state;
  }
}
export default UIReducer;