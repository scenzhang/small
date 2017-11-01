import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import {fetchUser} from '../../actions/user_actions';


class UserAbout extends Component {

  handleClick() {
    return;
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.fetchUser(this.props.userId);
    }
  }
  render() {
    if (!this.props.user) return <p>loading...</p>
    let name = this.props.link ? 
    <Link className="user-about-name" to={`/users/${this.props.user.id}`}> {this.props.user.name} </Link>
    :
    <h1 className="user-about-name">{this.props.user.name}</h1>

    return (
      <div class="user-about">
        {name}
        <p className="user-blurb">{this.props.user.blurb}</p>
        <button className="light-button" onClick={this.handleClick.bind(this)}>Follow</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.userId]
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id))
  }
} 
export default connect(mapStateToProps, mapDispatchToProps)(UserAbout);