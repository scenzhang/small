
import { RECEIVE_ARTICLE_ERRORS, RECEIVE_ARTICLE } from '../actions/article_actions';
import { CLEAR_ERRORS } from '../actions/session_actions';

const ArticleErrorReducer = (state = [], action) => {
  const newState = Object.assign([], state)
  switch (action.type) {
    case RECEIVE_ARTICLE_ERRORS: {
      return action.errors;
    }
    case RECEIVE_ARTICLE: {
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
export default ArticleErrorReducer;