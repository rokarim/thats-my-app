class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :tracks

  # def track_info
  #   track_info_array = []
  #   object.tracks.each do |track|
  #     track_info_array << {name: track.name, artist: track.artist}
  #   end
  #   return track_info_array
  # end

end
