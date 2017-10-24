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
      <div>
        <Link to="signup">Sign Up</Link>
        <br/>
        <Link to="login">Log In</Link>
      </div>
    )
  }
  handleClick() {
    this.props.logout();
  }
}
export default Greeting;