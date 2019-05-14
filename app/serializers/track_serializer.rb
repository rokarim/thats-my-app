class TrackSerializer < ActiveModel::Serializer
  attributes :name, :artist, :spotify_track_id, :album_image

  belongs_to :playlist
end
