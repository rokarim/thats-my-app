class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :name, null: false
      t.string :artist, null: false
      t.belongs_to :playlist, null: false
      t.string :spotify_track_id, null: false
    end
  end
end
