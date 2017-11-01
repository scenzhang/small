@articles.each do |article|
  json.set! article.id do
    json.partial! 'api/articles/article_preview', article: article
  end
end

