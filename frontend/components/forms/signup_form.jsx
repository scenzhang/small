import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { isEqual } from 'lodash';
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
    this.props.signup(this.state);

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
    if (this.props.loggedIn) return (<Redirect to='/' />);
    const errorLis = this.props.errors.map((error) => <li>{error}</li>);
    return (
      <div className="signup-div">
        <ul className="errors">{errorLis}</ul>
        <h1 className="serif heading">Join Small.</h1>
        <h2 className="subheading">Create an account to personalize your homepage,
          follow your favorite authors and publications,
          applaud stories you love, and more.

        </h2>
        <form className="userForm">

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
          <textarea
            onChange={this.handleInput('blurb')}
            className={this.state.blurbTooLong ? "invalid" : ""}
            value={this.state.blurb}
          >
          </textarea>
          
          <span>{140-this.state.blurb.length}</span>



          <button className='submit' disabled={this.state.buttonDisabled} onClick={this.handleSubmit}> Sign Up</button>

        </form>
        <div className="login-link">Already have an account? <Link to="login" onClick={this.props.clearErrors}>Log in.</Link></div>

      </div>
    );
  }
}

export default withRouter(SignupForm);