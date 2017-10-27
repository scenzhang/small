class Article < ApplicationRecord
  validates :title, :body, presence: true
  belongs_to :user
  # after_initialize :ensure_blurb
  
  # def ensure_blurb
  #   if self.blurb.nil? || self.blurb.empty? 
  #     sentences = self.body.split(".")
  #     self.blurb = ""
  #     sentences.each do |s|
  #       break if self.blurb.length > 140
  #       self.blurb += "#{s}. "
  #     end
  #   end
  # end
end
