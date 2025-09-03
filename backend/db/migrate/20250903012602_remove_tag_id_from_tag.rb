class RemoveTagIdFromTag < ActiveRecord::Migration[7.2]
  def change
    remove_column :tags, :tag_id, :integer
  end
end
