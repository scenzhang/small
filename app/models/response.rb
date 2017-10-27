class Response < ApplicationRecord
  validates :user_id, :article_id, :parent_response_id, :body, presence: true

  belongs_to :user
  belongs_to :article
  belongs_to :response, 
             foreign_key: :parent_response_id
end
