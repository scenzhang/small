# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
User.create!(name: "Demo Account", email: "demo@small.com", blurb: "A dummy user to demo the app", password: "asdfasdf")
10.times do
  name = Faker::WorldOfWarcraft.unique.hero
  email_name = name.split(" ").first.downcase.gsub(/[^0-9a-z]/i, '')
  email = "#{email_name}@wow.com"
  User.create!(
    name: name,
    email: email,
    blurb: Faker::Lorem.sentence,
    password: "asdfasdf"
  )
end

Article.destroy_all
10.times do
  a = Article.new(
    title: Faker::Hipster.unique.sentence(6),
    body: Faker::Lorem.paragraphs(20, 10).join("\n"),
    user_id: User.all.sample.id            
  )
  if [true, false].sample
    a.blurb = Faker::LeagueOfLegends.quote
  end
  a.save!
end

Response.destroy_all
#level 0
level0 = []
10.times do
  r = Response.new(
    user_id: User.all.sample.id,
    article_id: Article.all.sample.id,
    body: "level 0 response"            
  )
  r.save!
  level0 << [r.id, r.article_id]
end

#level 1
level1 = []
10.times do
  parent = level0.sample
  r = Response.new(
    user_id: User.all.sample.id,
    article_id: parent[1],
    parent_response_id: parent[0],
    # parent_response_id: Response.first.id,
    body: "level 1 response"
  )
  r.save!
  level1 << [r.id, r.article_id]

end

#level 2
level2 = []
10.times do
  parent = level1.sample
  r = Response.new(
    user_id: User.all.sample.id,
    article_id: parent[1],
    parent_response_id: parent[0],
    body: "level 2 response"
  )
  r.save!
  level2 << [r.id, r.article_id]

end

10.times do
  parent = level2.sample
  r = Response.new(
    user_id: User.all.sample.id,
    article_id: parent[1],
    parent_response_id: parent[0],
    body: "level 3 response"
  )
  r.save!

end