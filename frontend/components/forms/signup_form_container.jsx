import React from 'react';
import { connect } from 'react-redux';
import * as sessionActions from '../../actions/session_actions';
import signupForm from './signup_form';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: !!state.currentUser,
    errors: state.errors.session,
    formType: ownProps.location.pathname.slice(1)
  };
}


const mapDispatchToProps = (dispatch, { location}) => ({
  signup: (user) => dispatch(sessionActions.signup(user)),
  clearErrors: ()=>dispatch(sessionActions.clearErrors())

});

export default connect(mapStateToProps, mapDispatchToProps)(signupForm);