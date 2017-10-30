json.extract! article, :id, :title, :user_id
json.author article.user.name
json.date article.updated_at.to_date
json.time article.body.split(" ").length / 200 #avg person reads 200wpm

if article.blurb
  json.blurb article.blurb
  json.realBlurb true
else
  json.blurb article.body[0..140]
  json.realBlurb false
end
