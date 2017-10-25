import {RECEIVE_ALL_ARTICLES,
  RECEIVE_ARTICLE,
  REMOVE_ARTICLE,
} from '../actions/article_actions';
import _ from 'lodash';
const ArticlesReducer = (state = {}, action) => {
  const newState = _.merge({}, state);
  switch (action.type) {
    case RECEIVE_ALL_ARTICLES: {
      return action.articles;
    }
    case RECEIVE_ARTICLE: { 
      newState[action.article.id] = action.article;
      return newState;
    }
    case REMOVE_ARTICLE: {
      delete newState[action.article.id];
      return newState;
    }
    default: {
      return state;
    }

  }

}

export default ArticlesReducer;