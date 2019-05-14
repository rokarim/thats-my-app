class AddImageToTrack < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :album_image, :string, null:false, default: ""
  end
end
