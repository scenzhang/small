import { RECEIVE_ARTICLE,  } from '../actions/article_actions';
import { merge } from 'lodash'
const UIReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ARTICLE:
      newState.currArticle = action.article.id;
      return newState;
    default:
      return state;
  }
}
export default UIReducer;