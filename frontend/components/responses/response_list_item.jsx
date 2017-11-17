import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import DateReadtime from '../articles/date_readtime';
class _ResponseListItem extends Component {
  render() {
    if (!this.props.response) return <p>loading..</p>;
    const responses = this.props.response.response_ids.map((id) => this.props.responses[id])
    return (
      <li key={this.props.response.id} className={`level-${this.props.level}`} >
      <div className ="response">
          <DateReadtime date={this.props.response.date} time={this.props.response.time} />
          <Link className="greentext" to={`/users/${this.props.response.user_id}`}>{this.props.response.author}</Link>
        <Link to={`/responses/${this.props.response.id}`}>
          <div className="response-body serif">{this.props.response.body}</div>
          </Link>
          <div className="response-item-footer">
          {/* <i className="fa fa-sign-language" aria-hidden="true"></i> */}

        {
          this.props.level < 3 || !responses.length ||
          <Link to={`/responses/${this.props.response.id}`}>
          <span className="too-deep">{responses.length} response{responses.length > 1 ? "s": ""}</span>
          </Link>
        }
        </div>
      </div>
        {
          this.props.level >= 3 ||
          <ul>
            {responses.map((resp) => <ResponseListItem key={resp.id}level={this.props.level+1} response={resp}/>)}
            </ul>   
        }
      </li>
    );
  }
}
//TODO: export this without recursive response rendering for profile page
const mapStateToProps = ({entities: {responses}}) => ({
  responses
});
const ResponseListItem = connect(mapStateToProps, null )(_ResponseListItem);
export default ResponseListItem;