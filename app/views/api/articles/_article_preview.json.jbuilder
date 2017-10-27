json.extract! article, :id, :title, :user_id
json.author article.user.name
json.date article.updated_at.to_date
json.time article.body.split(" ").length / 200 #avg person reads 200wpm

  if article.blurb
    json.blurb article.blurb
  else
    sentences = article.body.split(".")
    blurb = []
    sentences.each do |s|
      break if blurb.join("").length > 140
      blurb << s
    end
    json.blurb blurb.join(".")
  end
