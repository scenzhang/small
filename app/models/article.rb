class Article < ApplicationRecord
  validates :title, :body, :blurb, presence: true
  belongs_to :user

  

end
