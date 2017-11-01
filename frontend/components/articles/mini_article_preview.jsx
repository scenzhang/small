import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';

function MiniArticlePreview({ title, author, responses }) {
  return (
    <div className="parent-container">
      <div>
        <div className="parent-body">{title}</div>
        <div className="parent-author">{author}</div>
      </div>
      <div className="num-responses">
        <span>{responses}</span>
      <i class="fa fa-comment" aria-hidden="true"></i>
        </div>
    </div>
  );

}

export default MiniArticlePreview;