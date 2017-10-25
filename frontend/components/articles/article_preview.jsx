import React from 'react';
import { Link } from 'react-router-dom';

function ArticlePreview({ article }) {
  let date = new Date(article.date);
  let today = new Date();
  let yrStr = today.getFullYear() === date.getFullYear() ? "" : ` ${date.getFullYear()}`;
  let dateStr = `${date.toLocaleString('en-us', {month: "short"})} ${date.getDate()}${yrStr}`;
  return (
    <li className='article-preview'>
      <Link to={`/articles/${article.id}`}>
        <div className="article-title">{article.title}</div>
        <span className="article-blurb">{article.blurb}</span>
        <span className="article-author">by {article.author}</span>
        <span>{dateStr}</span>
      </Link>
    </li>

  );
}

export default ArticlePreview;