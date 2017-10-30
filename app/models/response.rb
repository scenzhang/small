class Response < ApplicationRecord
  validates :user_id, :article_id, :body, presence: true
  belongs_to :user
  belongs_to :article
  belongs_to :response, 
             foreign_key: :parent_response_id,
             optional: true
  has_many :responses, foreign_key: :parent_response_id

  # include Respondable
  
  
end
