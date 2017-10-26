export const fetchArticles = () => $.ajax({url:'api/articles'});
export const fetchArticle = id => $.ajax({
  url: `api/articles/${id}`
});
export const createArticle = article => $.ajax({
  url: `api/articles`,
  method: 'post',
  data: {article}
});
export const updateArticle = article => $.ajax({
  url: `api/articles/${article.id}`,
  method: 'patch',
  data: {article}
});
export const deleteArticle = id => $.ajax({
  url: `api/articles/${id}`,
  method: 'delete'
});
