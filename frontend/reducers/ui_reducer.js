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
      return newState;
    case LOAD_RESPONSE:
      newState.response_loaded = false;
      return newState;
    
    case RECEIVE_ARTICLE:
      newState.currArticle = action.article.id;
      newState.article_loading = false;
      return newState;
    case RECEIVE_ALL_ARTICLES:
      newState.article_loading = false;
      return newState;
    case RECEIVE_RESPONSES:
      newState.response_loaded = true;
      newState.currResponses = action.responses.map((res) => res.id);
      return newState;
    case RECEIVE_RESPONSE:
      newState.response_loaded = true;
      newState.currResponses.push(action.response.id);
      newState.currArticle = action.response.article_id
      return newState;
    default:
      return state;
  }
}
export default UIReducer;