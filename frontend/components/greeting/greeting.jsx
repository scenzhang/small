import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {

  render() {

    const rightNav = this.props.currentUser ?
      (
        <nav className="logged-in right-nav">
          <span>Welcome, {this.props.currentUser.name}</span>
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
          <Link className="hoverable" to="signup" onClick={this.props.clearErrors}>Sign Up</Link>
          <br />
          <Link className="hoverable" to="login" onClick={this.props.clearErrors}>Log In</Link>
        </nav>
      )
    return (
      <nav className="main-nav">
        <h1 className="logo serif">Small</h1>

        {rightNav}
        </nav>
    );
  }
  handleClick() {
    this.props.logout();
  }
}
export default Greeting;