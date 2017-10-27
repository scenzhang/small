import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as sessionActions from '../actions/session_actions';

class NavBar extends React.Component {
  demoLogin() {
    this.props.clearErrors();
    this.props.demoLogin();
  }
  render() {
    let rightNav = null;
    if (this.props.location.pathname != '/login' && this.props.location.pathname != '/signup') {
      rightNav = this.props.currentUser ?
        (
          <nav className="logged-in right-nav">
            <span>Welcome, {this.props.currentUser.name}</span>
            <Link className="hoverable" to="/articles/new">New story</Link>
            <button
              onClick={this.props.logout}
            >
              Log out
          </button>
          </nav>
        )
        :
        (
          <nav className="logged-out right-nav">
            <div className="hoverable" onClick={this.demoLogin.bind(this)}>Demo</div>
            <Link className="hoverable" to="/signup" onClick={this.props.clearErrors}>Sign Up</Link>
            <Link className="hoverable" to="/login" onClick={this.props.clearErrors}>Log In</Link>
          </nav>
        )
    }
    return (
      <nav className="main-nav">
        <Link to='/'><h1 className="logo serif">Small</h1></Link>

        {rightNav}
      </nav>
    );
  }
  handleClick() {
    this.props.logout();
  }
}



const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ( {
  logout: () => dispatch(sessionActions.logout()),
  clearErrors: () => dispatch(sessionActions.clearErrors()),
  demoLogin: ()=> dispatch(sessionActions.login({email:"demo@small.com", password:"asdfasdf"}))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);