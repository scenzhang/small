json.partial! 'api/users/user', user: @user
json.articles @user.articles.map(&:id)
json.responses @user.responses.map(&:id)
