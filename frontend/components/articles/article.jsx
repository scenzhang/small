import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';
import { fetchArticle } from '../../actions/article_actions';

class Article extends Component {

  componentDidMount() {
    this.props.fetchArticle(this.props.match.params.articleId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.articleId != nextProps.match.params.articleId) {
      this.props.fetchArticle(nextProps.match.params.articleId);
    }
  }
  render() {
    let article = this.props.article || { body: "" };
    let articlePs = article.body.split("\n").map((p) => <p>{p}</p>)
    // debugger
    return (
      <div>
      <h1> {article.title} </h1>
      <h2> {article.author} </h2>
      <h3>{article.blurb}</h3>
      {articlePs}
      </div>
    );
  }
}
const mapStateToProps = ({entities, ui}) => ({
  article: entities.articles[ui.currArticle]
});
const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(fetchArticle(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article));