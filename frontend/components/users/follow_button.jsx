import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';

function FollowButton({isFollowing, onClick}) {
  return (
    <button onClick={onClick} className={isFollowing ? "light-button" : "dark-button"}>{isFollowing ? "Unf" : "F"}ollow</button>
  )
}

export default FollowButton;