class CreateResponses < ActiveRecord::Migration[5.1]
  def change
    create_table :responses do |t|
      t.integer :user_id, null: false
      t.integer :article_id, null: false
      t.integer :parent_response_id
      t.text :body, null: false

      t.timestamps
    end
    add_index :responses, :user_id
    add_index :responses, :article_id
    add_index :responses, :parent_response_id
  end
end
