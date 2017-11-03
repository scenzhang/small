json.partial! 'api/users/user', user: @user
json.articles do
  json.array! @user.articles.each do |article|
    json.partial! 'api/articles/article', article: article
  end
end
json.responses do
  json.array! @user.responses.each do |response|
    json.partial! 'api/responses/response', response: response
  end
end
