import * as SessionUtil from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const login = (user) => (dispatch) => {
  return SessionUtil.login(user)
  .then(
    (user) => dispatch(receiveCurrentUser(user)),
    (res) => dispatch(receiveErrors(res.responseJSON))
  ); 

}
export const signup = (user) => (dispatch) => {
  return SessionUtil.signup(user)  
  .then(
    (user) => dispatch(receiveCurrentUser(user)),
    (res) => dispatch(receiveErrors(res.responseJSON))
  ); 
}

export const logout = () => (dispatch) => {
  return SessionUtil.logout()
    .then(() => dispatch(receiveCurrentUser(null)))

}
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
}
export const receiveCurrentUser = (currUser) => {
  return { type: RECEIVE_CURRENT_USER, user: currUser };
}

export const receiveErrors = (errors) => {
  return { type: RECEIVE_SESSION_ERRORS, errors };
}