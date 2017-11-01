import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createResponse } from '../../actions/response_actions';
import ReactDOM from 'react-dom';
import Textarea from 'react-textarea-autosize';
import Errors from '../errors'
import { isEqual } from 'lodash';
import onClickOutside from 'react-onclickoutside';

class ResponseForm extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      formHidden: true,
      body: "",
      buttonDisabled: true
    };
  }
  handleClick(e) {
    e.preventDefault();
    if (!this.props.loggedIn) {
      this.props.history.push(`/login?redirect=${this.props.location.pathname}`);
      return;
    }
    this.setState({ formHidden: false });

  }
  handleClickOutside(e) {
    if (!this.state.formHidden) event.preventDefault(); //only prevent default if the form is showing, ie allow clicking links when form is hidden
    if(!this.state.body.length) this.setState({ formHidden: true });
  }
  handleChange(e) {
    this.setState({body: e.currentTarget.value, buttonDisabled: !e.currentTarget.value});
  }
  handleSubmit() {
    
    const newResp = {body: this.state.body, article_id: this.props.articleId};
    if (this.props.isResponse) newResp.parent_response_id = this.props.id;
    this.props.createResponse(newResp);
    this.setState({body: ""})
  }
  render() {
    return (
      <div className="response-form-container" onClick={this.handleClick}>
          { this.state.formHidden ?
          <div className={`serif prompt ${this.state.formHidden ? "" : "hidden"}`} onClick={this.handleClick}>
            Write a response...
          </div>
          :
          <form className='response-form serif' >
              <Textarea className='response-field' minRows={5} value={this.state.body} onChange={this.handleChange} autoFocus/>
              <button className="no-color-button" disabled={this.state.buttonDisabled} onClick={this.handleSubmit}>Publish</button>
            </form>
            
           
          }
        </div>
    );
  }
}
const mapStateToProps = ({session: {currentUser }}) => ({
  loggedIn: !!currentUser
})
const mapDispatchToProps = (dispatch) => ({
  createResponse: (resp) => dispatch(createResponse(resp))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(onClickOutside(ResponseForm)));
// export default connect(, )(ResponseForm);