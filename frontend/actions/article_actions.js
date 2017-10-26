import * as ArticleUtil from '../util/article_api_util';

export const RECEIVE_ALL_ARTICLES = 'RECEIVE_ALL_ARTICLES';
export const CREATE_ARTICLE = 'CREATE_ARTICLE'
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE'
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE'
export const RECEIVE_ARTICLE_ERRORS = 'RECEIVE_ARTICLE_ERRORS';
export const LOAD_ARTICLE = "LOAD_ARTICLE";
export const LOAD_ALL_ARTICLES = "LOAD_ALL_ARTICLES";

export const loadArticle = () => ({ type: LOAD_ARTICLE });

export const loadArticles = () => ({ type: LOAD_ALL_ARTICLES });

export const fetchArticles = () => (dispatch) => {
  dispatch(loadArticles());
  return ArticleUtil.fetchArticles().then(
    (articles) => dispatch(receiveAllArticles(articles))
  );
}

export const receiveAllArticles = (articles) => ({
  type: RECEIVE_ALL_ARTICLES, articles
});

export const fetchArticle = (id) => (dispatch) => {
  dispatch(loadArticle());
  return ArticleUtil.fetchArticle(id).then(
    (article) => dispatch(receiveArticle(article))
  );
};

export const receiveArticle = (article) => ({
  type: RECEIVE_ARTICLE, article
});

export const receiveErrors = (errors) => {
  return { type: RECEIVE_ARTICLE_ERRORS, errors };
};

export const createArticle = (article) => (dispatch) => {
  return ArticleUtil.createArticle(article).then(
    (article) => dispatch(receiveArticle(article)),
    (res) => receiveErrors(res.responseJSON)
  );
};

export const updateArticle = (article) => (dispatch) => {
  return ArticleUtil.updateArticle(article).then(
    (article) => dispatch(receiveArticle(article)),
    (res) => receiveErrors(res.responseJSON)
  );
};

export const deleteArticle = (id) => (dispatch) => {
  return ArticleUtil.deleteArticle(id).then(
    () => dispatch(removeArticle(id)),
    (res) => receiveErrors(res.responseJSON)
  );
};

export const removeArticle = (id) => {
  return { type: REMOVE_ARTICLE, id }
}
