import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { fetchUser } from '../../actions/user_actions';
import { createFollow, deleteFollow } from '../../actions/follow_actions';
import FollowButton from './follow_button'

class UserAbout extends Component {

  handleClick() {
    if (!this.props.currentUser) {
      this.props.history.push(`/login?redirect=${this.props.location.pathname}`);
      return;
    }
    if (this.props.following) {
      this.props.deleteFollow(this.props.currentUser.id, this.props.user.id);
    } else {
      this.props.createFollow(this.props.currentUser.id, this.props.user.id);
    }
  }

  componentDidMount() {
    if (!this.props.user && this.props.userId) {
      this.props.fetchUser(this.props.userId);
    }
  }
  render() {
    if (!this.props.user) return <p>loading...</p>
    let name = this.props.link ?
      <Link className="user-about-name" to={`/users/${this.props.user.id}`}>{this.props.user.name}</Link>
      :
      <div className="my-name">{this.props.user.name}</div>
    // 
    return (
      <div className={`user-about ${this.props.className}`}>
        <div className="user-name">
          {name}
          {this.props.user &&  (!this.props.currentUser || this.props.currentUser.id != this.props.user.id) &&
            <FollowButton isFollowing={this.props.following} onClick={this.handleClick.bind(this)}></FollowButton>}
        </div>
        <p className="user-blurb">{this.props.user.blurb}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let user = ownProps.user || state.entities.users[ownProps.userId];
  // 
  let following = state.session.currentUser && user && state.entities.follows[state.session.currentUser.id] &&
    state.entities.follows[state.session.currentUser.id].User.includes(user.id);

  return {
    user,
    currentUser: state.session.currentUser,
    following
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    createFollow: (followerId, followeeId) => dispatch(createFollow(followerId, followeeId)),
    deleteFollow: (followerId, followeeId) => dispatch(deleteFollow(followerId, followeeId)),

  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserAbout));