import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import { fetchArticle, deleteArticle } from '../../actions/article_actions';
import dateStr from '../../util/date_str'
import DropdownButton from './article-dropdown'
class Article extends Component {
  constructor(props) {
    super(props);
    this.state = { dropdownHidden: true, redirToIndex: false };
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDropdownClick() {
    this.setState({ dropdownHidden: !this.state.dropdownHidden });
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
      <div className="fill-container">
      <div className="article-container">
        <div className="article-heading">
          <h1> {article.title} </h1>
          <h3>by {article.author} </h3>
          {this.props.currUID === this.props.article.user_id ? //only show dropdown if logged in as owner (change when bookmarks added)
            <div><DropdownButton className="dropdown-button" onClick={this.handleDropdownClick} />
              <div className={`dropdown ${this.state.dropdownHidden ? 'hidden' : ''}`}>
                <ul>
                  <li> <Link to={`${this.props.match.url}/edit`}>Edit</Link> </li>
                  <li><a className="delete-article" onClick={this.handleDelete}> Delete </a></li>
                </ul>
              </div>
            </div>
            :
            <div />
          }
          <span className="date">{dateStr(article.date)}</span>
          <h2>{article.blurb}</h2>
        </div>
        <div className="article-body">
          {articlePs}
        </div>
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