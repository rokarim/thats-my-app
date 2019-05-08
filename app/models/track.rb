class Track < ApplicationRecord
  belongs_to :playlist

  validates :spotify_track_id, presence: true
end
