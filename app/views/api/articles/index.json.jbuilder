json.array! @articles do |article|
  json.partial! 'api/articles/article_preview', article: article
end

