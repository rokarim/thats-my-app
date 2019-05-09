class SelectionSerializer < ActiveModel::Serializer
  attributes :track_info
  def track_info
    track_info_array = []
    object["tracks"].each do |track|
      track_info_array << {spotify_id: track["id"], name: track["name"], artist: track["artists"][0]["name"]}
    end
    return track_info_array
  end
end
