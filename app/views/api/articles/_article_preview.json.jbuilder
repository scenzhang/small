json.extract! article, :id, :title, :blurb
json.author article.user.name
# json.date article.created_at.to_date
json.date 5.years.ago