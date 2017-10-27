import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import { fetchArticle, deleteArticle } from '../../actions/article_actions';
import ArticleDateReadtime from './date_readtime';
import DropdownButton from './article-dropdown'
class Article extends Component {
  constructor(props) {
    super(props);
    this.state = { dropdownHidden: true, redirToIndex: false };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deleteArticle(this.props.article.id).then(() => this.setState({ redirToIndex: true }));

  }
  componentDidMount() {
    this.props.fetchArticle(this.props.match.params.articleId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.articleId != nextProps.match.params.articleId) {
      this.props.fetchArticle(nextProps.match.params.articleId);
    }
  }
  render() {
    if (this.state.redirToIndex) return <Redirect to="/" />;
    let article = this.props.article || { body: "" };
    if (this.props.loading || !article.body) return <div>loading...</div>;
    let articlePs = article.body.split("\n").map((p, i) => <p key={i}>{p}</p>)
    return (
      <div className="article-container">
        <div className="article-heading">
          <h3 className="heading-author">{article.author} </h3>
          <ArticleDateReadtime date={article.date} time={article.time}/>
          <h1> {article.title} </h1>
          {this.props.currUID === this.props.article.user_id ? //only show dropdown if logged in as owner (change when bookmarks added)
            <DropdownButton 
            className="dropdown-button" 
            opts={[<li key="edit"> <Link to={`${this.props.match.url}/edit`}>Edit</Link> </li>,
            <li key="delete"><a className="delete-article" onClick={this.handleDelete}> Delete </a></li>]}
             />

            :
            <div />
          }
          <h2 className="heading-blurb serif">{article.blurb}</h2>
        </div>
        <div className="article-body serif">
          {articlePs}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ entities, ui, session }) => ({
  article: entities.articles[ui.currArticle],
  loading: ui.loading,
  currUID: session.currentUser ? session.currentUser.id : null
});
const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(fetchArticle(id)),
  deleteArticle: (id) => dispatch(deleteArticle(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article));