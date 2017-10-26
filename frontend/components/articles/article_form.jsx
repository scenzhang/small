import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createArticle } from '../../actions/article_actions';
import ReactDOM from 'react-dom';

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", body: "", redirect: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createArticle(this.state);
    this.setState({redirect: true});

  }
  render() {
    // debugger
    
    if (!this.props.loggedIn) {
      return <Redirect to="/login"/>
    }
    if (this.state.redirect) return <Redirect to={`/articles/${this.state.redirectTo}`} />
    return (
      <div>
        <form className="article-form">
          <input
            type="text"
            placeholder="Title"
            onChange={this.handleChange('title')}
            value={this.props.title}
          />
          <textarea
            placeholder="Tell your story..."
            onChange={this.handleChange('body')}
            value={this.props.body} />
          <button onClick={this.handleSubmit}>Publish</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors.articles, loggedIn: !!state.session.currentUser, redirectTo: state.ui.currArticle
});

const mapDispatchToProps = (dispatch) => ({
  createArticle: (article) => dispatch(createArticle(article))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);