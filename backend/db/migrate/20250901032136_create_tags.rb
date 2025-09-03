class CreateTags < ActiveRecord::Migration[7.2]
  def change
    create_table :tags do |t|
      t.integer :tag_id
      t.string :name

      t.timestamps
    end
  end
end
