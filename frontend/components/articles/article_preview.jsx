import React from 'react';
import { Link } from 'react-router-dom';
import dateStr from '../../util/date_str'
import ArticleDateReadtime from './date_readtime';
function ArticlePreview({ article }) {
  let date = dateStr(article.date)
  return (
    <li className='article-preview' key={article.id}>
      <div className='preview-container'>
      <Link to={`/articles/${article.id}`}>
        
        <div className='article-img'>

        </div>
        </Link>
        <div className="preview-text">
        <Link to={`/articles/${article.id}`}>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-blurb">{article.blurb}{article.realBlurb ? "" : "..." }</div>
        </Link>
        <div className="preview-bottom">
        <Link to={`/users/${article.user_id}`} className="article-author">{article.author}</Link>
          <ArticleDateReadtime date={article.date} time={article.time}/>
        </div>
        </div>
      </div>
    </li>

  );
}

export default ArticlePreview;