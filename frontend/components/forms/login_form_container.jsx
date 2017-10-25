import React from 'react';
import { connect } from 'react-redux';
import * as sessionActions from '../../actions/session_actions';
import LoginForm from './login_form';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: !!state.currentUser,
    errors: state.errors.session,
  };
}


const mapDispatchToProps = (dispatch, { location}) => ({
  login: (user) => dispatch(sessionActions.login(user)),
  clearErrors: ()=>dispatch(sessionActions.clearErrors())
  
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);