import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createArticle, fetchArticle, updateArticle } from '../../actions/article_actions';
import ReactDOM from 'react-dom';
import Textarea from 'react-textarea-autosize';
import Errors from '../errors'
import { isEqual } from 'lodash';

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      redirect: false,
      id: this.props.article ? this.props.article.id : null,
      submitDisabled: true,
      titleInvalid: false,
      bodyInvalid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUpdate(_, nextState) {
    let submitDisabled = !nextState.title || !nextState.body;
    if (!isEqual(this.state, nextState)) {
      this.setState( { submitDisabled })
    }
  }
  componentDidMount() {
    const { match: { path, params: { articleId } }, article, fetchArticle } = this.props
    if (path.includes("edit")) {
      if (!article) {
        fetchArticle(articleId).then((res) => {
          this.setState({ title: res.article.title, body: res.article.body })
        });
      } else {
        this.setState({ title: article.title, body: article.body });
      }
    }

  }



  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });

    }
  }


  handleSubmit(e) {
    e.preventDefault();
    // debugger
    this.props.action(this.state).then((res) => {

      this.setState({ redirect: true, id: res.article.id }); //set the id with response so we can correctly redirect
    });

  }
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />
    }
    if (this.state.redirect) return <Redirect to={`/articles/${this.state.id}`} />
    return (
      <div className="form-container">
        <Errors errors={this.props.errors} />
        <form className="article-form">
          <Textarea
            autoFocus
            type="text"
            className="title-field"
            placeholder="Title"
            onChange={this.handleChange('title')}
            value={this.state.title}
          />
          <Textarea
            minRows={30}
            placeholder="Tell your story..."
            className="body-field"
            onChange={this.handleChange('body')}
            value={this.state.body} />
          <button
            onClick={this.handleSubmit}
            disabled={this.state.submitDisabled}
          >
            Publish
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.articles,
    loggedIn: !!state.session.currentUser,
    article: state.entities.articles[ownProps.match.params.articleId],
    id: state.ui.currArticle
  };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.match.path.includes("new") ? createArticle : updateArticle;
  return ({
    action: (article) => dispatch(action(article)),
    fetchArticle: (id) => dispatch(fetchArticle(id))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);