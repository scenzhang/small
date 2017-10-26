json.extract! article, :id, :title, :blurb, :user_id
json.author article.user.name
json.date article.updated_at.to_date