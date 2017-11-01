json.extract! user, :id, :name, :email, :blurb
json.articles user.articles.map(&:id)
json.responses user.responses.map(&:id)
