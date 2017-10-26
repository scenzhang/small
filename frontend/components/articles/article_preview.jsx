import React from 'react';
import { Link } from 'react-router-dom';
import dateStr from '../../util/date_str'
function ArticlePreview({ article }) {
  let date = dateStr(article.date)
  return (
    <li className='article-preview' key={article.id}>
      <div className='preview-div'>
      <Link to={`/articles/${article.id}`}>
        <h1 className="article-title">{article.title}</h1>
        <div className="article-blurb">{article.blurb}</div>
        <div className="preview-bottom"><span className="article-author">by {article.author}</span>
        <span>{date}</span>
        </div>
      </Link>
      </div>
    </li>

  );
}

export default ArticlePreview;