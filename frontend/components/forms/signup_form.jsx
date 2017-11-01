import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as sessionActions from '../../actions/session_actions';
import { isEqual } from 'lodash';
import Textarea from 'react-textarea-autosize';
import Errors from '../errors'
class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pwConfirm: "",
      name: "",
      blurb: "",
      emailValid: true,
      allFieldsFilled: true,
      pwValidLen: true,
      buttonDisabled: true,
      pwMatch: true,
      blurbTooLong: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const redirectTo = this.props.location.search.split("=")[1] // '?redirect=/url'    
    this.props.signup(this.state);
    this.props.history.push(redirectTo);

  }

  componentWillUpdate(_, nextState) {
    let emailValid, allFieldsFilled, pwValidLen, blurbTooLong;

    emailValid = nextState.email.match(/.+@.+\...+/i) || !nextState.email//[anything]@[anything].[anything]
    allFieldsFilled = (nextState.name && nextState.email && nextState.password && nextState.blurb);
    pwValidLen = nextState.password.length >= 6 || nextState.password.length === 0;
    blurbTooLong = nextState.blurb.length > 140
    if (!isEqual(this.state, nextState)) {
      this.setState({ emailValid, allFieldsFilled, pwValidLen, blurbTooLong });
      this.setState({ buttonDisabled: !(emailValid && allFieldsFilled && pwValidLen && !blurbTooLong) });
      this.setState({ pwMatch: nextState.password === nextState.pwConfirm })
    }


  }

  handleInput(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  handleEmailInput(e) {
    this.setState({ email: e.currentTarget.value });

  }

  render() {
    debugger
    if (this.props.loggedIn) return (<Redirect to='/' />);
    // const errorLis = this.props.errors.map((error) => <li>{error}</li>);
    return (
      <div className="wrapper">
        <div className="signup-div">
          <Errors errors={this.props.errors} />
          <h1 className="serif heading">Join Small.</h1>
          <h2 className="subheading">Create an account to personalize your homepage,
          follow your favorite authors and publications,
          applaud stories you love, and more.

        </h2>
          <form className="user-form">

            <label>Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleInput('name')}
            />



            <label>Email </label>
            <input
              type="text"
              onChange={this.handleEmailInput}
              value={this.state.email}
              className={this.state.emailValid ? "emailInput" : "invalid"}
            />
            <span>{this.state.emailValid ? "" : "invalid email"}</span>


            <label>Password </label>
            <input
              type="password"
              onChange={this.handleInput('password')}
              value={this.state.password}
              className={this.state.pwValidLen && this.state.pwMatch ? "" : "invalid"}
            />
            <span>{this.state.pwValidLen ? "" : "password too short"}</span>

            <label>Confirm password</label>
            <input
              type="password"
              onChange={this.handleInput('pwConfirm')}
              value={this.state.pwConfirm}
              className={this.state.pwMatch ? "" : "invalid"}
            />
            <span>{this.state.pwMatch ? "" : "passwords don't match"}</span>
            <label>About you </label>
            <Textarea
              onChange={this.handleInput('blurb')}
              className={this.state.blurbTooLong ? "invalid" : ""}
              value={this.state.blurb}
              onKeyDown={(e) => { if (e.which === 13) e.preventDefault() }} //disable newlines in about me
            >
            </Textarea>

            <span className="chars-left">{140 - this.state.blurb.length}</span>



            <button className='submit dark-button' disabled={this.state.buttonDisabled} onClick={this.handleSubmit}> Sign Up</button>

          </form>
          <div className="login-link">Already have an account? <Link to="login" onClick={this.props.clearErrors}>Log in.</Link></div>

        </div>
      </div>
    );
  }
}

// export default withRouter(SignupForm);
const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    loggedIn: !!state.session.currentUser,
    errors: state.errors.session,
    formType: ownProps.location.pathname.slice(1)
  };
}


const mapDispatchToProps = (dispatch, { location }) => ({
  signup: (user) => dispatch(sessionActions.signup(user)),
  clearErrors: () => dispatch(sessionActions.clearErrors())

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupForm));