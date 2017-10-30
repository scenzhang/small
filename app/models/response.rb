class Response < ApplicationRecord
  validates :user_id, :article_id, :body, presence: true
  belongs_to :user
  belongs_to :article
  belongs_to :response, 
             foreign_key: :parent_response_id,
             optional: true
  has_many :responses, foreign_key: :parent_response_id

  def all_children
    if self.responses.empty?
      return []
    end
    children = []
    self.responses.each do |res|
      children << res
      children << res.all_children
    end
    children.flatten
  end

end
