import React from 'react';
import { Link } from 'react-router-dom';
import dateStr from '../../util/date_str'
import ArticleDateReadtime from './date_readtime';
function ArticlePreview({ article, url }) {
  debugger
  let date = dateStr(article.date)
  return (
    <li className='article-preview' key={article.id}>
      <div className='preview-container'>
        <Link to={url}>

          <div className='article-img'>

          </div>
        </Link>
        <div className="preview-text">
          <Link to={url}>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-blurb">{article.blurb}{article.realBlurb ? "" : "..."}</div>
          </Link>
          <div className="preview-bottom">
            <Link to={`/users/${article.user_id}`} className="article-author">{article.author}</Link>
            <div className="details">
            <ArticleDateReadtime date={article.date} time={article.time} />
            
            </div>
          </div>
        </div>
      </div>
    </li>

  );
}

export default ArticlePreview;