import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import { fetchResponses, fetchReplies } from '../../actions/response_actions';
import ResponseListItem from './response_list_item';
class ResponseList extends Component {
  componentDidMount() {
    if (this.props.isResponse) {
      this.props.getReplies(this.props.id);
    } else {
      this.props.getResponses(this.props.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.id != nextProps.id) {
      if (this.props.isResponse) {
        this.props.getReplies(nextProps.id);
      } else {
        this.props.getResponses(nextProps.id);
      }
    }
  }

  render() {
    if (!this.props.loaded) return <p> loading... </p>
    // const topLevel = Object.values(this.props.responses).filter( (resp) => !resp.parent_response_id );
    return (
      <ul className="responses">
        { /* this.props.responseIds.map( (id)=> {
          // debugger
        return (<li key={id}>
        <Link to={`/responses/${id}`}>
        {this.props.responses[id].body} 
        </Link>
        {this.props.responses[id].author}
        </li>)
        }
        )
      */}

        {
          this.props.responseIds.map((id) => {
            return (
              <div class="list-item-container">
                <div class="divider-line"/>
            <ResponseListItem level={0} response={this.props.responses[id]} />
            </div>
            )
            
          })
        }

      </ul>
    );
  }
}
const mapStateToProps = ({ entities: { responses }, ui }) => {
  return { responses, loaded: ui.response_loaded, responseIds: ui.currResponses };
  //instead pass in the array of responses to item
};
const mapDispatchToProps = (dispatch) => {
  return {
    getResponses: (articleId) => dispatch(fetchResponses(articleId)),
    getReplies: (responseId) => dispatch(fetchReplies(responseId))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponseList);