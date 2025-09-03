class RemoveVideoIdFromVideo < ActiveRecord::Migration[7.2]
  def change
    remove_column :videos, :video_id, :integer
  end
end
