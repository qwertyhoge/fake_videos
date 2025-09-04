class AddRateToVideos < ActiveRecord::Migration[7.2]
  def change
    add_column :videos, :rate, :integer, default: 0
  end
end
