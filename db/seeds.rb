# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
User.create!(name:"Demo Account", email:"demo@small.com", blurb: "this web app extremely owns", password:"asdfasdf")
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