import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import UserAbout from './user_about'
import { fetchUser } from '../../actions/user_actions';
import UserProfileItem from './user_profile_item';
import ArticlePreview from '../articles/article_preview'
import MiniArticlePreview from '../articles/mini_article_preview'
import UserNav from './user_nav';

class UserProfile extends Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.fetchUser(this.props.match.params.id);
    }
    window.scrollTo(0,0);
    
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id != nextProps.match.params.id) {
      this.props.fetchUser(nextProps.match.params.id);
    }
  }
  render() {
    let mode = this.props.match.params.mode
    if (mode) mode = mode.toLowerCase();
    return (
      <div>

        <UserAbout className="profile-about" user={this.props.user} />
        <UserNav id={this.props.user ? this.props.user.id : null} />
        {(() => {
          switch (mode) {
            case "following":
              return (
                <div className="user-follows">
                  <div className="follows-header">Following</div>
                  <ul>
                    { this.props.user && this.props.follows[this.props.user.id] &&
                      this.props.follows[this.props.user.id].User
                      .map(followingId => <UserAbout link={true} className="following-about" userId={followingId}/>)
                    }
                  </ul>
                  </div>
                  
              )
            case "responses":
              return (
                <div className="user-responses">
                  <div className="response-header">Responses</div>
                  <ul>
                    {this.props.user && this.props.user.responses.map(response =>
                      <UserProfileItem
                        body={response.body}
                        author={response.author}
                        numResponses={response.response_ids.length}
                        date={response.date}
                        time={response.time}
                        id={response.id}
                        author_url={`/users/${response.user_id}`}
                        item_url={`/responses/${response.id}`}
                      />
                    )}
                  </ul>
                </div>)
            case "articles": //show articles by default
            default:
              return (
                <div className="user-articles">
                  <div className="response-header">Articles</div>
                  <ul>
                    {this.props.user && this.props.user.articles.map(article =>
                      <UserProfileItem
                        key={article.id}
                        title={article.title}
                        body={article.body}
                        blurb={article.blurb}
                        author={article.author}
                        numResponses={article.response_ids.length}
                        date={article.date}
                        time={article.time}
                        id={article.id}
                        author_url={`/users/${article.user_id}`}
                        item_url={`/articles/${article.id}`} />)}
                  </ul>
                </div>
              )
          }
        })()
        }
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.match.params.id],
    follows: state.entities.follows
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);