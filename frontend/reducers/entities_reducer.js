import { combineReducers } from 'redux';
import articles from './articles_reducer';
import users from './users_reducer';
export default combineReducers({ articles, users });