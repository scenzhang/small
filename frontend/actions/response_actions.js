import * as ResponseUtil from '../util/response_api_util';
export const RECEIVE_RESPONSES = "RECEIVE_RESPONSES";
export const RECEIVE_RESPONSE = "RECEIVE_RESPONSE";
export const CREATE_RESPONSE = "CREATE_RESPONSE";
export const UPDATE_RESPONSE = "UPDATE_RESPONSE";
export const REMOVE_RESPONSE = "REMOVE_RESPONSE";
export const LOAD_RESPONSE = "LOAD_RESPONSE";
export const LOAD_RESPONSES = "LOAD_RESPONSES";
export const RECEIVE_RESPONSE_ERRORS = "RECEIVE_RESPONSE_ERRORS";
export const FETCH_REPLIES = "FETCH_REPLIES"

// id refers to the response for which replies are being fetched, and is null if top level responses to an article
// are being fetched. this is used by the ui reducer to pass which top level responses to render to responselist,
// which then recursively renders lower level responses.
export const loadResponse = (id) => ({ type: LOAD_RESPONSE, id });

export const loadResponses = (id) => ({ type: LOAD_RESPONSES, id }); 

export const fetchResponses = (articleId) => (dispatch) => {
  dispatch(loadResponses(null)); 
  return ResponseUtil.fetchResponses(articleId).then(
    (responses) => dispatch(receiveResponses(responses))
  );
}

export const receiveResponses = (responses) => ({
  type: RECEIVE_RESPONSES, responses
});

export const fetchReplies = (id) => (dispatch) => {
  dispatch(loadResponses(id));
  return ResponseUtil.fetchReplies(id).then(
    (responses) => dispatch(receiveResponses(responses))
  );
}

export const fetchResponse = (id) => (dispatch) => {
  dispatch(loadResponse(id));
  return ResponseUtil.fetchResponse(id).then(
    (response) => dispatch(receiveResponse(response))
  );
};

export const receiveResponse = (response) => ({
  type: RECEIVE_RESPONSE, response
});

export const receiveErrors = (errors) => {
  return { type: RECEIVE_RESPONSE_ERRORS, errors };
};

export const createResponse = (response) => (dispatch) => {
  return ResponseUtil.createResponse(response).then(
    (response) => dispatch(receiveResponse(response)),
    (res) => receiveErrors(res.responseJSON)
  );
};

export const updateResponse = (response) => (dispatch) => {
  return ResponseUtil.updateResponse(response).then(
    (response) => dispatch(receiveResponse(response)),
    (res) => receiveErrors(res.responseJSON)
  );
};

export const deleteResponse = (id) => (dispatch) => {
  return ResponseUtil.deleteResponse(id).then(
    () => dispatch(removeResponse(id)),
    (res) => receiveErrors(res.responseJSON)
  );
};

export const removeResponse = (id) => {
  return { type: REMOVE_RESPONSE, id }
}
