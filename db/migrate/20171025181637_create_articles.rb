class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.string :blurb
      t.integer :user_id, null: false
      
      t.timestamps
    end
    add_index :articles, :user_id
  end
end
