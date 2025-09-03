class CreateTaggings < ActiveRecord::Migration[7.2]
  def change
    create_table :taggings do |t|
      t.references :video, foreign_key: true
      t.references :tag, foreign_key: true

      t.timestamps
    end
  end
end
