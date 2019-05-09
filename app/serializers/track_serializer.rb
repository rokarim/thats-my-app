class TrackSerializer < ActiveModel::Serializer
  attributes :name, :artist, :spotify_track_id

  belongs_to :playlist
end
