json.array! @articles.each do |article|
    json.partial! 'api/articles/article_preview', article: article

end

