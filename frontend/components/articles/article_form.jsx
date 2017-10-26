import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';

class ArticleForm extends Component {
  state = {  }
  render() {
    return (
      
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors.articles, loggedIn: !!state.currentUser;
});


export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);