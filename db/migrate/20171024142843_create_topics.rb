class CreateTopics < ActiveRecord::Migration[5.1]
  def change
    create_table :topics do |t|
      t.string :name

      t.timestamps
    end
    add_index :topics, :name, unique: true
  end
end
