class Follow < ApplicationRecord
  belongs_to :follower, class_name: :user, foreign_key: :follower_id
  belongs_to :followed, class_name: :user, foreign_key: :followed_id
end
