import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as sessionActions from '../actions/session_actions';

class NavBar extends React.Component {
  demoLogin() {
    this.props.clearErrors();
    this.props.demoLogin();
  }
  componentDidMount() {
    if (this.props.currentUser) {
      this.props.receiveUser(this.props.currentUser); //we do this so on refresh, state is still populated with current user's follows
    }
  }
  render() {
    let rightNav = null;
    if (this.props.location.pathname != '/login' && this.props.location.pathname != '/signup') {
      rightNav = this.props.currentUser ?
        (
          <nav className="logged-in right-nav">
            <Link className=" grey-hoverable" to={`/users/${this.props.currentUser.id}`}>{this.props.currentUser.name}</Link>
            <Link className="light-button" to="/articles/new">New story</Link>
            <button className="dark-button"
              onClick={this.props.logout}
            >
              Log out
          </button>
          </nav>
        )
        :
        (
          <nav className="logged-out right-nav">
            <div className="light-button" onClick={this.demoLogin.bind(this)}>Demo</div>
            <Link className="light-button" to={`/signup?redirect=${this.props.location.pathname}`} onClick={this.props.clearErrors}>Sign Up</Link>
            <Link className="light-button" to={`/login?redirect=${this.props.location.pathname}`} onClick={this.props.clearErrors}>Log In</Link>
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
  demoLogin: ()=> dispatch(sessionActions.login({email:"demo@small.com", password:"asdfasdf"})),
  receiveUser: (u) => dispatch(sessionActions.receiveCurrentUser(u))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);