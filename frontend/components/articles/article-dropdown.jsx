import React, { Component } from 'react';

function DropdownButton(props) {
  return (
  <svg className="dropdown-button" width="19" height="19" viewBox="0 0 19 19" onClick={props.onClick}>
  <path  d="M3.9 6.772 l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254 L4.753 6z" >
    </path>
  </svg>
  )
}

export default DropdownButton;
