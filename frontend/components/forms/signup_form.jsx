import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      blurb: ""

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);
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
      <div>
        <ul>{errorLis}</ul>
        <h2>Sign up</h2>
        <form>
          <label>Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleInput('name')}
          />
          <label>Email: </label>
          <input
            type="text"
            onChange={this.handleInput('email')}
            value={this.state.email}
          />
          <label>Password: </label>
          <input
            type="password"
            onChange={this.handleInput('password')}
            value={this.state.password}
          />
          
          <label>About you: </label>
          <input
            type="text"
            onChange={this.handleInput('blurb')}
            value={this.state.blurb}
          />


          <button onClick={this.handleSubmit} > Sign Up</button>

        </form>
        <Link
          to='login'
        >
          Log In
        </Link>
      </div>
    );
  }
}

export default withRouter(SignupForm);