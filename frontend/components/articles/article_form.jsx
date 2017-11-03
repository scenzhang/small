import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createArticle, fetchArticle, updateArticle } from '../../actions/article_actions';
import ReactDOM from 'react-dom';
import Textarea from 'react-textarea-autosize';
import Errors from '../errors'
import { isEqual } from 'lodash';
import {createResponse, fetchResponse, updateResponse } from '../../actions/response_actions'

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      blurb: "",
      redirect: false,
      id: this.props.article ? this.props.article.id : null,
      submitDisabled: true,
      titleInvalid: false,
      bodyInvalid: false,
      author_id: null,
      blurbField: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentWillUpdate(_, nextState) {
    let submitDisabled = !nextState.title || !nextState.body;
    if (!isEqual(this.state, nextState)) {
      this.setState( { submitDisabled });
    
    }
  }

 
  componentDidMount() {
    const { match: { path, params: { id } }, article, fetchArticle } = this.props
    if (path.includes("edit")) {
      if (!article) {
        fetchArticle(id).then((res) => {
          if (res.article) {
            this.setState({ title: res.article.title, body: res.article.body, author_id: res.article.user_id, id: res.article.id });
          }
          if (res.response) {
            this.setState({title: "Editing response", body: res.response.body, author_id: res.response.user_id, id: res.response.id});
          }

        });
      } else {
        this.setState({ title: this.props.match.url.includes("article") ? article.title : "Editing response",
        body: article.body, author_id: article.user_id 
      });
      }
    }

  }


  handlePress(e) {
    if (e.key== 'Enter') {
      e.preventDefault();
      this.setState({blurbField: true})
    }
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });

    }
  }


  handleSubmit(e) {
    e.preventDefault();
    // 
    this.props.action(this.state).then((res) => {
      this.setState({ redirect: true, url: res.article ? `/articles/${res.article.id}` : `/responses/${res.response.id}`}); //set the id with response so we can correctly redirect
    });

  }
  render() {
    if (!this.props.currentUID) {
      return <Redirect to="/login" />
    }
    if (this.state.author_id && this.state.author_id != this.props.currentUID) return <Redirect to={`/articles/${this.props.match.params.id}`} />
    // if (this.props.currentUID != )
    if (this.state.redirect) return <Redirect to={this.state.url} />
    return (
      <div className="form-container">
        <form className="article-form">
          { this.props.match.url.includes('article') ?
          <div className="title-container">
            <Textarea
              autoFocus
              type="text"
              className="title-field"
              placeholder="Title"
              onChange={this.handleChange('title')}
              onKeyPress={this.handlePress}
              value={this.state.title}
            />
            {this.state.blurbField && 
            <Textarea autoFocus 
            type="text" 
            className="blurb-field" 
            onChange={this.handleChange('blurb')} 
            value={this.state.blurb}/>
          }
          </div> :
          <h1>{this.state.title}</h1>
        }
          <Textarea
            minRows={30}
            placeholder="Tell your story..."
            className="body-field"
            onChange={this.handleChange('body')}
            value={this.state.body} />
          <button
          className="dark-button"
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
    currentUID: state.session.currentUser.id,
    article: state.entities.articles[ownProps.match.params.id],
  };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.match.path.includes("new") ? createArticle : updateArticle;
  return ({
    action: (article) => dispatch(action(article)),
    fetchArticle: (id) => dispatch(fetchArticle(id))
  });
}
const mapStateToResponse = (state, ownProps) => {
  return {
    currentUID: state.session.currentUser.id,
    article: state.entities.responses[ownProps.match.params.id]
  }
}

const mapDispatchToResponse = (dispatch, ownProps) => {
  const action = ownProps.match.path.includes("new") ? createResponse : updateResponse;
  return ({
    action: (response) => dispatch(action(response)),
    fetchArticle: (id) => dispatch(fetchResponse(id))
  })
}
export const ResponseForm = connect(mapStateToResponse, mapDispatchToResponse)(ArticleForm);
export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);