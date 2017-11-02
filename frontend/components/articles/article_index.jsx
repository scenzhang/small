import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticles } from '../../actions/article_actions'
import { allArticles } from '../../reducers/selectors'
import ArticlePreview from './article_preview';

class ArticleIndex extends Component {
  
  componentDidMount() {
    this.props.fetchArticles();
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="index">
        <ul>
          {this.props.articles.map(article => <ArticlePreview key={article.id} article={article} url={`/articles/${article.id}`} />)}
        </ul>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  articles: allArticles(state)
});
const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(fetchArticles())
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleIndex);