import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {
  render() {
    if (this.props.currentUser) {
      return (
        <div>
          <h1>Welcome, {this.props.currentUser.name}!</h1>
          <button
            onClick={this.props.logout}
            
          >
            Log out
          </button>
        </div>
      )
    }
    return (
      <div className="loggedOutNav">
        <Link className="hoverable" to="signup">Sign Up</Link>
        <br/>
        <Link className="hoverable" to="login">Log In</Link>
      </div>
    )
  }
  handleClick() {
    this.props.logout();
  }
}
export default Greeting;