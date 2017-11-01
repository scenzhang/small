import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';

import {fetchUser} from '../../actions/user_actions';

class UserProfile extends Component {
  componentDidMount() {
    if (!this.props.user) {
      debugger
      this.props.fetchUser(this.props.match.params.id);
    }
  }
  render() {
    return (
      
      <div>
        {this.props.user ? this.props.user.blurb : "loading"}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.match.params.id]
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps )(UserProfile);