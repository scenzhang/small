class Article < ApplicationRecord
  validates :title, :body, presence: true
  belongs_to :user
  after_initialize :ensure_blurb
  
  def ensure_blurb
    if self.blurb.nil? || self.blurb.empty? 
      self.blurb = self.body.split(".").first
    end
  end
end
