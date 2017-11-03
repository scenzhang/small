import * as FollowUtil from '../util/follow_api_util';

export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW';


export const receiveFollow = (follow) => ({
  type: RECEIVE_FOLLOW,
  follow
});

export const getFollow = (follower_id, followable_id, followable_type = "User") => dispatch => {
  return FollowUtil.getFollow(follower_id, followable_id, followable_type = "User")
    .then((follow => dispatch(receiveFollow(follow))));
};

export const createFollow = (follower_id, followable_id, followable_type = "User") => dispatch => {
  return FollowUtil.createFollow(follower_id, followable_id, followable_type)
    .then((follow) => dispatch(receiveFollow(follow)));
};

export const removeFollow = (follow) => ({
  type: REMOVE_FOLLOW,
  follow
});

export const deleteFollow = (follower_id, followable_id, followable_type = "User") => dispatch => {
  return FollowUtil.deleteFollow(follower_id, followable_id, followable_type)
    .then((follow) => dispatch(removeFollow(follow)));
};