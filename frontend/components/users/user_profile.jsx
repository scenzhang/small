import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';
import UserAbout from './user_about'

class UserProfile extends Component {


  render() {
    return (
      <div>
        <UserAbout link={false} userId={this.props.match.params.id}/> 
      </div>
    );
  }
}


export default UserProfile;