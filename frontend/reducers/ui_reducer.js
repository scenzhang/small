import {
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE,
  RECEIVE_ALL_ARTICLES,
  RECEIVE_ARTICLE
} from "../actions/article_actions";
import {
  merge
} from 'lodash'
import loading from './loading_reducer'

const UIReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case LOAD_ALL_ARTICLES:
      newState.loading = true;
      return newState;
    case LOAD_ARTICLE:
      newState.loading = true;
    return newState;
    case RECEIVE_ARTICLE:
      newState.currArticle = action.article.id;
      newState.loading = false;
      return newState;
    case RECEIVE_ALL_ARTICLES:
      newState.loading = false;
      return newState;
    default:
      return state;
  }
}
export default UIReducer;