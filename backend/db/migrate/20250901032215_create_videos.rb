class CreateVideos < ActiveRecord::Migration[7.2]
  def change
    create_table :videos do |t|
      t.integer :video_id
      t.references :user, foreign_key: true
      t.string :title
      t.integer :length

      t.timestamps
    end
  end
end
