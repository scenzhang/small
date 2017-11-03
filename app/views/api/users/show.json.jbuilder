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

articles = Article
.joins("join users on articles.user_id = users.id join follows on follows.followable_id = users.id")
.where("follower_id = #{@user.id}")
.order(updated_at: :desc)
.map(&:id)


json.feedItems do
   json.array! articles
end
