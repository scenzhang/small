json.extract! response, :id, :body, :user_id, :article_id, :parent_response_id
json.responses response.responses.map(&:id)
json.author response.user.name
