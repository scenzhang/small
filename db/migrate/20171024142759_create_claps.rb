class CreateClaps < ActiveRecord::Migration[5.1]
  def change
    create_table :claps do |t|
      t.integer :user_id
      t.integer :content_id
      t.string :clappable_type
      t.integer :times_clapped

      t.timestamps
    end
    add_index :claps, [:user_id, :content_id], unique: true
    add_index :claps, :content_id
  end
end
