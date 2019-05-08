class AudioFeature < ApplicationRecord
  validates :activity_name, presence: true
  validates :min_acousticness, numericality: true, allow_nil: true
  validates :max_acousticness, numericality: true, allow_nil: true
  validates :min_danceability, numericality: true, allow_nil: true
  validates :max_danceability, numericality: true, allow_nil: true
  validates :min_energy, numericality: true, allow_nil: true
  validates :max_energy, numericality: true, allow_nil: true
  validates :min_instrumentalness, numericality: true, allow_nil: true
  validates :max_instrumentalness, numericality: true, allow_nil: true
  validates :target_mode, numericality: {only_integer: true}, allow_nil: true
  validates :min_speechiness, numericality: true, allow_nil: true
  validates :max_speechiness, numericality: true, allow_nil: true
  validates :min_tempo, numericality: true, allow_nil: true
  validates :max_tempo, numericality: true, allow_nil: true
  validates :min_valence, numericality: true, allow_nil: true
  validates :max_valence, numericality: true, allow_nil: true
  validates :min_popularity, numericality: true, allow_nil: true
  validates :max_popularity, numericality: true, allow_nil: true
  validates :min_loudness, numericality: true, allow_nil: true
  validates :max_loudness, numericality: true, allow_nil: true
end
