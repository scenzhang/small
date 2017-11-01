import { combineReducers } from 'redux';
import articles from './articles_reducer';
import users from './users_reducer';
import responses from './responses_reducer'
export default combineReducers({ articles, responses, users });