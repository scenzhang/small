import {
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE,
  RECEIVE_ALL_ARTICLES,
  RECEIVE_ARTICLE
} from "../actions/article_actions"

const loadingReducer = (state = false, action) => {

  switch (action.type) {
    case LOAD_ALL_ARTICLES:
      return true;
    case LOAD_ARTICLE:
      return true;
    case RECEIVE_ALL_ARTICLES:
      return false;
    case RECEIVE_ARTICLE:
      return false;
    default:
      return state;

  }

}