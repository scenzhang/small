import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';

function Landing() {
  return (
    <div className="landing">
      <div className="landing-text">

        <h1 className="landing-header serif">Interesting ideas that set your mind in motion.</h1>
        <h2 className="landing-subhead">Hear directly from the people who know it best. From tech to politics to creativity and more - whatever your interest, we've got you covered.
        </h2>
        <Link className="black-button landing-button" to="/signup">Get started</Link>
      </div>
      <div className="landing-img">

      </div>
    </div>
  )

}


export default withRouter(Landing);