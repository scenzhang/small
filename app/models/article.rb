class Article < ApplicationRecord
  validates :title, :body, presence: true
  belongs_to :user
  has_many :responses

  # include Respondable
  def top_level_responses
    self.responses.where(parent_response_id: nil).order(:id)
  end

  def gen_tree
    to_visit = []
    tree = []
    self.top_level_responses.each do |res|
      tree << res.id
      to_visit += res.responses
      until to_visit.empty?
        curr = to_visit.pop
        to_visit += curr.responses
        tree << curr.id

      end
      
    end
    tree
  end
end
