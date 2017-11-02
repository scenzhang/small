class Follow < ApplicationRecord
  belongs_to :followable, polymorphic: :true, optional: true
  belongs_to :follower, class_name: :User, foreign_key: :follower_id
  validates :follower_id, uniqueness: {scope: %i(followable_id followable_type)}
end
