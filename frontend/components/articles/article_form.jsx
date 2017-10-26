import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {createArticle} from '../../actions/article_actions';
import ReactDOM from 'react-dom';

class ArticleForm extends Component {
  state = {  }
  render() {
    return (
      <div>
        <form action=""></form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors.articles, loggedIn: !!state.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  createArticle: (article) => dispatch(createArticle(article))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);