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
    
  }
  componentWillReceiveProps(nextProps) {
    if ( this.props.match.url.includes('article') &&
      this.props.match.params.id != nextProps.match.params.id) {
      this.props.fetchArticle(nextProps.match.params.id);
    }
  }
  render() {
    if (this.state.redirToIndex) return <Redirect to="/" />;
    let article = this.props.article || { body: "" };

    if (!article.body) return <div>loading...</div>;
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
        <ResponseForm id={article.id} articleId={this.props.articleId} isResponse={this.props.match.url.includes("response")}/>
            <ResponseList id={article.id} isResponse={this.props.match.url.includes("response")}/>
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

const mapStateToResponse = ({entities, ui, session }, ownProps) => ({
  article: entities.responses[ownProps.match.params.id],
  currUID: session.currentUser ? session.currentUser.id : null,
  articleId: ui.currArticle
});

const mapDispatchToResponse = (dispatch) => ({
  fetchArticle: (id) => dispatch(fetchResponse(id)),
  deleteArticle: (id) => dispatch(deleteResponse(id))
})
export const Response = withRouter(connect(mapStateToResponse, mapDispatchToResponse)(Article));

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article));