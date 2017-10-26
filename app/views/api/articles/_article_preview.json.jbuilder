json.extract! article, :id, :title, :blurb
json.author article.user.name
json.date article.created_at.to_date