import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import { fetchArticle, deleteArticle } from '../../actions/article_actions';
import ArticleDateReadtime from './date_readtime';
import DropdownButton from '../dropdown'
import { fetchResponse, deleteResponse } from '../../actions/response_actions';
import ResponseList from '../responses/response_list'
import ResponseForm from '../responses/response_form'
import UserAbout from '../users/user_about'
import MiniArticlePreview from "./mini_article_preview";
class Article extends Component {
  constructor(props) {
    super(props);
    this.state = { dropdownHidden: true, redirToIndex: false };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deleteArticle(this.props.article.id).then(() => this.setState({ redirToIndex: true }));
    //when profiles implemented redirect to profile index instead

  }

  componentDidMount() {
    if (!this.props.article) this.props.fetchArticle(this.props.match.params.id);
    if (!this.props.parentResponse && this.props.parentId) this.props.fetchArticle(this.props.parentId);
    if (!this.props.parentArticle && this.props.parentArticleId) this.props.fetchParentArticle(this.props.parentArticleId);


  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.url.includes('article') &&
      this.props.match.params.id != nextProps.match.params.id) {
      this.props.fetchArticle(nextProps.match.params.id);
    }
    if (!this.props.parentResponse && this.props.parentId) this.props.fetchArticle(this.props.parentId);
    if (!this.props.parentArticle && this.props.parentArticleId) this.props.fetchParentArticle(this.props.parentArticleId);


  }
  render() {
    if (this.state.redirToIndex) return <Redirect to="/" />;
    let article = this.props.article || { body: "" };
    if (!article.body) return <div>loading...</div>;
    let articlePs = article.body.split("\n").map((p, i) => <p key={i}>{p}</p>)
    return (
      <div className="article-response-container">
        <div className="article-container">
          <div className="article-heading">
            <UserAbout userId={article.user_id} link={true} />
            <h3 className="heading-author">{article.author} </h3>
            <ArticleDateReadtime date={article.date} time={article.time} />
            {
              this.props.parentArticle &&
              <Link to={`/articles/${this.props.parentArticleId}`}>
                <MiniArticlePreview
                  title={this.props.parentArticle.title}
                  author={this.props.parentArticle.author}
                  responses={this.props.parentArticle.response_ids.length}
                />

              </Link>
            }
            {
              this.props.parentResponse && //if parent response isn't loaded don't evaluate rest
              <Link to={`${this.props.parentId}`}>

                <MiniArticlePreview
                  title={this.props.parentResponse.body}
                  author={this.props.parentResponse.author}
                  responses={this.props.parentResponse.response_ids.length}
                />
              </Link>
            }
            <h1> {article.title} </h1>
            {this.props.currUID === this.props.article.user_id ? //only show dropdown if logged in as owner (change when bookmarks added)
              <DropdownButton
                className="dropdown-toggle"
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
        <div className="responses-container">
          <div className="response-header">Responses</div>
          <ResponseForm id={article.id} articleId={this.props.articleId} isResponse={this.props.match.url.includes("response")} />
          <ResponseList id={article.id} isResponse={this.props.match.url.includes("response")} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ entities, ui, session }) => ({
  article: entities.articles[ui.currArticle],
  loading: ui.article_loading,
  currUID: session.currentUser ? session.currentUser.id : null,
  articleId: ui.currArticle

});
const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(fetchArticle(id)),
  deleteArticle: (id) => dispatch(deleteArticle(id))
});

const mapStateToResponse = ({ entities, ui, session }, ownProps) => {
  const article = entities.responses[ownProps.match.params.id];
  let parentId, parentArticleId;
  if (article) parentId = article.parent_response_id;
  if (article && !parentId) parentArticleId = article.article_id; //article being responded to
  let parentArticle = entities.articles[parentArticleId];
  return ({
    article,
    currUID: session.currentUser ? session.currentUser.id : null,
    articleId: ui.currArticle,
    parentId,
    parentResponse: entities.responses[parentId],
    parentArticleId,
    parentArticle: entities.articles[parentArticleId]
  });
};

const mapDispatchToResponse = (dispatch) => ({
  fetchArticle: (id) => dispatch(fetchResponse(id)),
  deleteArticle: (id) => dispatch(deleteResponse(id)),
  fetchParentArticle: (id) => dispatch(fetchArticle(id))
})
export const Response = withRouter(connect(mapStateToResponse, mapDispatchToResponse)(Article));

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article));