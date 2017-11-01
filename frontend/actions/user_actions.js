import * as UserUtil from '../util/user_api_util';
export const FETCH_USER = "FETCH_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const LOAD_USER = "LOAD_USER"

export const receiveUser = user => ({
  type: RECEIVE_USER, user
});

export const loadUser = () => ({ type: LOAD_USER });


export const fetchUser = id => dispatch => {
  dispatch(loadUser());
  return UserUtil.fetchUser(id).then( (user) => dispatch(receiveUser(user)) );
}