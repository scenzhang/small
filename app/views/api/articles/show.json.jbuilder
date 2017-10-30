json.extract! @article, :id, :title, :blurb, :body, :user_id
json.author @article.user.name
json.date @article.updated_at.to_date
json.time @article.body.split(" ").length / 200
json.response_ids @article.responses.map(&:id)