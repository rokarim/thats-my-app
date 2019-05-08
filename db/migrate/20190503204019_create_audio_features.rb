class CreateAudioFeatures < ActiveRecord::Migration[5.2]
  def change
    create_table :audio_features do |t|
      t.string :activity_name, null: false
      t.float :min_acousticness
      t.float :max_acousticness
      t.float :min_danceability
      t.float :max_danceability
      t.float :min_energy
      t.float :max_energy
      t.float :min_instrumentalness
      t.float :max_instrumentalness
      t.integer :target_mode
      t.float :min_speechiness
      t.float :max_speechiness
      t.float :min_tempo
      t.float :max_tempo
      t.float :min_valence
      t.float :max_valence
      t.float :min_popularity
      t.float :max_popularity
      t.float :min_loudness
      t.float :max_loudness
    end
  end
end
