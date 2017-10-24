class CreateFollows < ActiveRecord::Migration[5.1]
  def change
    create_table :follows do |t|
      t.integer :follower_id
      t.integer :followed_id
      t.string :followable_type

      t.timestamps
    end
    add_index :follows, [:follower_id, :followed_id], unique: true
    add_index :follows, :followed_id
  end
end
