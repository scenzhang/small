json.extract! response, :id, :body, :user_id, :article_id, :parent_response_id
json.responses response.responses.map(&:id)
json.author response.user.name
json.time response.body.split(" ").length / 200
json.date response.updated_at.to_date