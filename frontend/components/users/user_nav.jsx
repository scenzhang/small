import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';

function UserNav({id}) {
  return (
    <div className="user-nav">
      <Link to={`/users/${id}/articles`}> Articles </Link>
      <Link to={`/users/${id}/responses`}> Responses </Link>
      
      </div>
  )
}

export default UserNav;