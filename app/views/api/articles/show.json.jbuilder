json.extract! @article, :id, :title, :blurb, :body
json.author @article.user.name