import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';
import {fetchResponses} from '../../actions/response_actions';

class ResponseList extends Component {
  componentDidMount() {
    this.props.getResponses(this.props.articleId);
  }

  render() {
    if (!this.props.loaded) return <p> loading... </p>
    return (
      <ul>
        {this.props.responseIds.map( (id)=> {
          // debugger
        return (<li key={id}>
        
        {this.props.responses[id].body} 
        {this.props.responses[id].author}
        </li>)
        }
        )
      }
      </ul>
    );
  }
}
const mapStateToProps = ({entities: {responses}, ui}) => {
  return {responses, loaded: ui.response_loaded, responseIds: ui.currResponses };
};
const mapDispatchToProps = (dispatch) => {
  return { getResponses: (articleId) => dispatch(fetchResponses(articleId))};
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponseList);