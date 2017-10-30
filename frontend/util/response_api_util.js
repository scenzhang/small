export const fetchResponses = (articleId) => {
  return $.ajax({url:`api/articles/${articleId}/responses`});
}

export const createResponse = response => $.ajax({
  url: `api/responses`,
  method: 'post',
  data: {response}
});
export const updateResponse = response => $.ajax({
  url: `api/responses/${response.id}`,
  method: 'patch',
  data: {response}
});
export const deleteResponse = id => $.ajax({
  url: `api/responses/${id}`,
  method: 'delete'
});
