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
      name: "",
      blurb: "",
      emailValid: true,
      allFieldsFilled: true,
      pwValidLen: true,
      buttonDisabled: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);

  }

  componentWillUpdate(_, nextState) {
    let emailValid, allFieldsFilled, pwValidLen;

    emailValid = nextState.email.match(/.+@.+\..+/i) || !nextState.email//[anything]@[anything].[anything]
    allFieldsFilled = (nextState.name && nextState.email && nextState.password && nextState.blurb);
    pwValidLen = nextState.password.length >= 6 || nextState.password.length === 0;

    if (!isEqual(this.state, nextState)) {
      this.setState({ emailValid, allFieldsFilled, pwValidLen });
      this.setState( {buttonDisabled: !(emailValid && allFieldsFilled && pwValidLen)});
    }


  }

  handleInput(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
      // , buttonDisabled: Boolean(e.currentTarget.value)
    }
  }

  handleEmailInput(e) {
    this.setState({ email: e.currentTarget.value });
    // if (!e.currentTarget.value.match(/.+@.+\..+/i) && e.currentTarget.value) { //[anything]@[anything].[anything]
    //   this.setState({emailValid: false});
    // } else {
    //   this.setState({emailValid: true});
    // }
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

          <label>Name</label> <br />
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleInput('name')}
          />

          <br />

          <label>Email: </label> <br />
          <input
            type="text"
            onChange={this.handleEmailInput}
            value={this.state.email}
            className={this.state.emailValid ? "emailInput" : "invalid"}
          />
          <span>{this.state.emailValid ? "" : "invalid email"}</span>
          <br />

          <label>Password: </label> <br />
          <input
            type="password"
            onChange={this.handleInput('password')}
            value={this.state.password}
            className={this.state.pwValidLen ? "" : "invalid"}
          />
          <span>{this.state.pwValidLen ? "" : "password too short"}</span>          
          <br />

          <label>About you: </label> <br />
          <input
            type="text"
            onChange={this.handleInput('blurb')}
            value={this.state.blurb}
          />
          <br />


          <button className='submit' disabled={this.state.buttonDisabled} onClick={this.handleSubmit}> Sign Up</button>

        </form>
        <div className="login-link">Already have an account? <Link to="login">Log in.</Link></div>

      </div>
    );
  }
}

export default withRouter(SignupForm);