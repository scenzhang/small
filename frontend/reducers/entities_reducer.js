import { combineReducers } from 'redux';
import articles from './articles_reducer';
import users from './users_reducer';
import responses from './responses_reducer';
import follows from './follows_reducer';
export default combineReducers({ articles, responses, users, follows });

