json.extract! @response, :body, :user_id, :article_id
json.children_ids @response.all_children.map(&:id)