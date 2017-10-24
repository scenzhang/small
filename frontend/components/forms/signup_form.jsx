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
      blurb: ""

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
    this.setState( { email: e.currentTarget.value });
    const errors = $('.errors')[0];
    if (e.currentTarget.value.match(/.+@.+\..+/i)) { //[anything]@[anything].[anything]

      $('.submit').removeAttr('disabled');
      ReactDOM.unmountComponentAtNode(errors);
    } else {
      $('.submit').attr('disabled', 'true');
      ReactDOM.render(<li>{e.currentTarget.value} is not a valid email address</li>, errors);
    }
  }

  render() {
    if (this.props.loggedIn) return (<Redirect to='/' />);
    const errorLis = this.props.errors.map((error) => <li>{error}</li>);
    return (
      <div>
        <ul className="errors">{errorLis}</ul>
        <h2>Sign up</h2>
        <form>
          <label>Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleInput('name')}
          />
          <br/>
          <label>Email: </label>
          <input
            type="text"
            onChange={this.handleEmailInput}
            value={this.state.email}
          />
          <br/>
          <label>Password: </label>
          <input
            type="password"
            onChange={this.handleInput('password')}
            value={this.state.password}
          />
          <br/>
          
          <label>About you: </label>
          <input
            type="text"
            onChange={this.handleInput('blurb')}
            value={this.state.blurb}
          />
          <br/>


          <button className='submit' onClick={this.handleSubmit} > Sign Up</button>

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