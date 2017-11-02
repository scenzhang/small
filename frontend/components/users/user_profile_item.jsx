import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import DateReadtime from '../articles/date_readtime';


function UserProfileItem({ title, blurb, body, author, numResponses, date,time, id, author_url, item_url }) {
  return (
    <li key={id} >
      <div className="user-item">
        <DateReadtime date={date} time={time} />
        <Link className="greentext" to={author_url}>{author}</Link>
        <Link to={item_url}>
          <div className="item-blurb serif"> {blurb} </div>
          <div className="item-body serif">{body.slice(0, 240)}{body.length > 240 ? "..." : ""}</div>
          {body.length > 240 && <div className="grey-hoverable">Read more...</div>}
        </Link>
        <div className="item-footer">
          <i className="fa fa-sign-language" aria-hidden="true"></i>

          <div className="num-responses">
            <span>{numResponses}</span>
            <i class="fa fa-comment" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </li>
  )
}

export default UserProfileItem;