import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
class DropdownButton extends Component {
  constructor(props) {
    super(props);
    this.state = { dropdownHidden: true };
    this.handleClick = this.handleClick.bind(this);

  }
  handleClickOutside() {
    this.setState({ dropdownHidden: true });
  }
  handleClick() {
    this.setState({ dropdownHidden: !this.state.dropdownHidden });
  }
  render() {
    return (
      <div>
        <svg className="dropdown-toggle" width="19" height="19" viewBox="0 0 19 19" onClick={this.handleClick}>
          <path d="M3.9 6.772 l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254 L4.753 6z" >
          </path>
        </svg>
        <div className={`dropdown ${this.state.dropdownHidden ? 'hidden' : ''}`}>
          <ul>
            {this.props.opts}
          </ul>
        </div>
      </div>
    )
  }
}

export default onClickOutside(DropdownButton);
