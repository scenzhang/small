import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      blurb: "",
      emailValid: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);
    
  }

  handleInput(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
      if (!e.currentTarget.value) {
        $('.submit').attr('disabled', 'true');

      } else {
        $('.submit').removeAttr('disabled');
      }
    }
  }

  handleEmailInput(e) {
    // debugger
    this.setState({ email: e.currentTarget.value });
    const emailContainer = $('.email-field-container')[0];
    if (!e.currentTarget.value.match(/.+@.+\..+/i) && e.currentTarget.value) { //[anything]@[anything].[anything]
      this.setState({emailValid: false});
    } else {
      this.setState({emailValid: true});
    }
  }

  render() {
    if (this.props.loggedIn) return (<Redirect to='/' />);
    const errorLis = this.props.errors.map((error) => <li>{error}</li>);
    return (
      <div>
        <ul className="errors">{errorLis}</ul>
        <h2 className="serif">Sign Up</h2>
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
            className={ this.state.emailValid ? "emailInput" : "invalid"}
          />
          <span>{this.state.emailValid ? "" : "invalid email"}</span>
          <br />
        
          <label>Password: </label> <br />
          <input
            type="password"
            onChange={this.handleInput('password')}
            value={this.state.password}
          />
          <br />

          <label>About you: </label> <br />
          <input
            type="text"
            onChange={this.handleInput('blurb')}
            value={this.state.blurb}
          />
          <br />


          <button className='submit' onClick={this.handleSubmit} > Sign Up</button>

        </form>

      </div>
    );
  }
}

export default withRouter(SignupForm);