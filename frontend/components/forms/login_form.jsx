import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as sessionActions from '../../actions/session_actions';
import Errors from '../errors'
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const redirectTo = this.props.location.search.split("=")[1] // '?redirect=/url'
    this.props.login(this.state).then(
      (res) => {
        if (res.type="RECEIVE_CURRENT_USER") {
          this.props.history.push(redirectTo);
        }
      }
    );
    // if (!this.props.errors) this.props.history.push(redirectTo);
  }
  handleDemo(e) {
    e.preventDefault();
    const redirectTo = this.props.location.search.split("=")[1] // '?redirect=/url'
    this.props.demoLogin().then(
      (res) => {
        if (res.type="RECEIVE_CURRENT_USER") {
          this.props.history.push(redirectTo);
        }
      }
    );
  }

  handleInput(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  render() {
    if (this.props.loggedIn) return (<Redirect to='/' />);
    // const errorLis = this.props.errors.map((error) => <li>{error}</li>);
    return (
      <div className="wrapper">
        <div className="login-div">
          <Errors errors={this.props.errors} />
          <h1 className="serif heading">Welcome back.</h1>
          <h2 className="subheading">Sign in to access your personalized homepage, follow
          authors and topics you love, and clap for stories that matter to you.


        </h2>
          <form className="user-form">
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

            <button className="dark-button" onClick={this.handleSubmit} > Log In </button>

          </form>
          <div className="signup-link">Are you new to Small? 
            <Link className="greentext" to="signup" onClick={this.props.clearErrors}> Sign up</Link> or <a className="greentext" onClick={this.handleDemo}>demo</a>
            .</div>

        </div>
      </div>
    );
  }
}

// export default withRouter(LoginForm);
const mapStateToProps = (state, ownProps) => {
  // debugger
  return {
    loggedIn: !!state.session.currentUser,
    errors: state.errors.session,
  };
}


const mapDispatchToProps = (dispatch, { location }) => ({
  login: (user) => dispatch(sessionActions.login(user)),
  demoLogin: ()=> dispatch(sessionActions.login({email:"demo@small.com", password:"asdfasdf"})),
  clearErrors: () => dispatch(sessionActions.clearErrors())

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));