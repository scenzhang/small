import {
  RECEIVE_FOLLOW,
  REMOVE_FOLLOW
} from '../actions/follow_actions';
import {
  RECEIVE_USER
} from '../actions/user_actions';
import {
  merge,
  remove
} from 'lodash'
import {
  RECEIVE_CURRENT_USER
} from '../actions/session_actions'
const followsReducer = (state = {}, action) => {
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_FOLLOW:
      {
        if (!newState[action.follow.follower_id]) {
          newState[action.follow.follower_id] = {};
        }
        let thisUserFollows = newState[action.follow.follower_id];
        if (!thisUserFollows[action.follow.followable_type]) {
          thisUserFollows[action.follow.followable_type] = [];
        }
        if (!thisUserFollows[action.follow.followable_type].includes(action.follow.followable_id)) {
          thisUserFollows[action.follow.followable_type].push(action.follow.followable_id);
        }
        return newState;
      }
    case REMOVE_FOLLOW:
      {
        remove(newState[action.follow.follower_id][action.follow.followable_type], (n) => n === action.follow.followable_id);
        // 
        return newState;
      }
    case RECEIVE_CURRENT_USER:
    // 
      if (!action.user) return state;
        
    case RECEIVE_USER: //when we receive a user also populate his followers/follows
      {
        action.user.followers.forEach((followerId) => {
          if (!newState[followerId]) {
            newState[followerId] = {};
          }
          let thisUserFollows = newState[followerId];
          if (!thisUserFollows.User) {
            thisUserFollows.User = [];
          }
          if (!thisUserFollows.User.includes(action.user.id)) {
            thisUserFollows.User.push(action.user.id);
          }
        });
        action.user.following.forEach((followeeId) => {
          if (!newState[action.user.id]) {
            newState[action.user.id] = {};
          }
          let thisUserFollows = newState[action.user.id];
          if (!thisUserFollows.User) {
            thisUserFollows.User = [];
          }
          if (!thisUserFollows.User.includes(followeeId)) {
            thisUserFollows.User.push(followeeId);
          }
        });
        return newState;
      }

    default:
      {
        return state;
      }

  }
};

export default followsReducer;
// state:
//   {
//   followerId: {
//     users: [4, 5, 6], //followed users
//     topics: []
//   }
// }