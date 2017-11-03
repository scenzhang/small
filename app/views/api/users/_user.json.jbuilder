json.extract! user, :id, :name, :email, :blurb
json.followers do
  json.array! user.followers.map(&:id)
end
json.following do
  json.array! user.followed_users.map(&:id)
end
