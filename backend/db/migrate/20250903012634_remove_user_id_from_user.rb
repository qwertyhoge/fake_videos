class RemoveUserIdFromUser < ActiveRecord::Migration[7.2]
  def change
    remove_column :users, :user_id, :integer
  end
end
