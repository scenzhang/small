class Response < ApplicationRecord
  validates :user_id, :article_id, :body, presence: true
  belongs_to :user
  belongs_to :article
  belongs_to :response, 
             foreign_key: :parent_response_id,
             optional: true
  has_many :responses, foreign_key: :parent_response_id

  # include Respondable
  def gen_tree
    to_visit = []
    tree = []
    self.responses.each do |res|
      tree << res
      to_visit += res.responses
      until to_visit.empty?
        curr = to_visit.pop
        to_visit += curr.responses
        tree << curr

      end
      
    end
    tree
  end
  
end
