import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import dateStr from '../../util/date_str'

function ArticleDateReadtime({ date, time }) {
  let dateS = dateStr(date);
  return (
    <div className="preview-details">
      <span>{dateS}</span> 
      <span className="divider"></span> 
      <span className="reading-time" title={`${time} min read`}></span>
    </div>
  )

}

export default ArticleDateReadtime;