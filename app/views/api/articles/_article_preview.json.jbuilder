json.extract! article, :id, :title, :blurb, :user_id
json.author article.user.name
json.date article.updated_at.to_date
json.time article.body.length / 200 #avg person reads 200wpm