import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }

  handleInput(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  render() {
    if (this.props.loggedIn) return (<Redirect to='/' />);
    const errorLis = this.props.errors.map((error) => <li>{error}</li>);
    return (
      <div className="login-div">
        <ul className="errors">{errorLis}</ul>
        <h1 className="serif heading">Welcome back.</h1>
        <h2 className="subheading">Sign in to access your personalized homepage, follow 
          authors and topics you love, and clap for stories that matter to you.
        
    
        </h2>
        <form className="userForm">
          <label>Email </label> <br />
          <input
            type="text"
            onChange={this.handleInput('email')}
            value={this.state.email}
          />
          <br />
          <label>Password </label> <br />
          <input
            type="password"
            onChange={this.handleInput('password')}
            value={this.state.password}
          />
          <br />

          <button onClick={this.handleSubmit} > Log In </button>

        </form>
        <div className="signup-link">Are you new to Small? <Link to="signup">Sign up.</Link></div>

      </div>
    );
  }
}

export default withRouter(LoginForm);