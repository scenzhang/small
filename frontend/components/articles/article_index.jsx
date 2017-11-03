import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticles } from '../../actions/article_actions'
import { allArticles } from '../../reducers/selectors'
import ArticlePreview from './article_preview';
import Landing from '../landing';
class ArticleIndex extends Component {
  
  componentDidMount() {
    this.props.fetchArticles();
    window.scrollTo(0, 0)
  }

  render() {
    
    if (this.props.toDisplay && this.props.articles && //todisplay or articles has not yet been updated and are out of sync
      this.props.toDisplay.length > Object.keys(this.props.articles).length) return <div>loading...</div>
    return (
      <div>
        {!this.props.loggedIn && <Landing/>}
      <div className="index">
        <ul>
          {this.props.toDisplay && this.props.articles && 
            this.props.toDisplay.map(id => <ArticlePreview key={id} article={this.props.articles[id]} url={`/articles/${id}`} />)}
        </ul>
      </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  let following = state.session.currentUser && state.entities.follows[state.session.currentUser.id] ? 
    state.entities.follows[state.session.currentUser.id].User : "ALL"
  let toDisplay = following === "ALL" ? Object.keys(state.entities.articles) : [];
  if (following != "ALL") {
    Object.values(state.entities.articles).forEach((article) => {
      if (following.includes(article.user_id)) {
        toDisplay.push(article.id);
      }
    });
  }
  return ({
  articles: state.entities.articles,
  toDisplay,
  loggedIn: !!state.session.currentUser
});
}
const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(fetchArticles())
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleIndex);