class Article < ApplicationRecord
  validates :title, :body, presence: true
  belongs_to :user
  has_many :responses


end
