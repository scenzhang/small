class CreateTopicTags < ActiveRecord::Migration[5.1]
  def change
    create_table :topic_tags do |t|
      t.integer :topic_id
      t.integer :article_id

      t.timestamps
    end
    add_index :topic_tags, [:topic_id, :article_id], unique: true
    add_index :topic_tags, :article_id
  end
end
