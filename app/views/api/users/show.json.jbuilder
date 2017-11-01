json.partial! 'api/users/user', user: @user
json.articles do
  @user.articles
end

json.responses @user.responses
