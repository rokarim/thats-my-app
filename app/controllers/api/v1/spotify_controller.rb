require 'rest-client'

class Api::V1::SpotifyController < ApplicationController
  def create
    response = JSON.parse(request.body.read)
    playlist = Playlist.find(response["playlist_id"].to_i)
    playlist.saved = true
    binding.pry
    tracks = playlist.tracks
    user = playlist.selection.user
    refresh_token(user)

    options = {
      "name": playlist.name,
      "description": "Generated by ThatsMyJam",
      "public": false
    }

    headers = {Authorization: "Bearer #{user.access_token}"}

    url = "https://api.spotify.com/v1/users/#{user.username}/playlists"
    create_playlist_spotify = RestClient.post url, options.to_json, headers

    new_playlist_id = JSON.parse(create_playlist_spotify.body)["id"]
    new_tracks_params = {}
    new_tracks_params["uris"] = []
    tracks.each_with_index do |track, index|
      new_tracks_params["uris"].push("spotify:track:#{track.spotify_track_id}")
    end

    url = "https://api.spotify.com/v1/playlists/#{new_playlist_id}/tracks"
    create_playlist_spotify = RestClient.post url, new_tracks_params.to_json, headers
  end
end
