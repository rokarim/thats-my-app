class PlaylistSerializer < ActiveModel::Serializer
  attributes :track_info

  def track_info
    track_info_array = []
    object.tracks.each do |track|
      track_info_array << {name: track.name, artist: track.artists}
    end
    return track_info_array
  end

end
