import {RECEIVE_ALL_ARTICLES,
  RECEIVE_ARTICLE,
  REMOVE_ARTICLE,
} from '../actions/article_actions';
import {merge} from 'lodash';
const ArticlesReducer = (state = {}, action) => {
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ALL_ARTICLES: {
      return action.articles;
    }
    case RECEIVE_ARTICLE: { 
      newState[action.article.id] = action.article;
      return newState;
    }
    case REMOVE_ARTICLE: {
      delete newState[action.id];
      return newState;
    }
    default: {
      return state;
    }

  }

}

export default ArticlesReducer;