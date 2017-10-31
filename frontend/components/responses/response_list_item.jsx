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
          {this.props.response.id}
          <DateReadtime date={this.props.response.date} time={this.props.response.time} />
        <Link to={`/responses/${this.props.response.id}`}>
          {this.props.response.body}
        </Link>
          {this.props.response.author}
          <ul>
            {responses.map((resp) => <ResponseListItem level={this.props.level+1} response={resp}/>)}
            </ul>


      </li>
    );
  }
}

const mapStateToProps = ({entities: {responses}}) => ({
  responses
});
const ResponseListItem = connect(mapStateToProps, null )(_ResponseListItem);
export default ResponseListItem;