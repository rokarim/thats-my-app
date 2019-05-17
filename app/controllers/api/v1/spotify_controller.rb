require 'rest-client'

class Api::V1::SpotifyController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: {:access_token => current_user.access_token}
  end

  def create
    response = JSON.parse(request.body.read)
    playlist = Playlist.find(response["playlist_id"].to_i)
    playlist.saved = true
    playlist.save
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
    render json: playlist.id
  end

  def update
    ########## GET CURRENT PLAYBACKS
    playlist = Playlist.find(params[:id])
    user = playlist.selection.user
    url = "https://api.spotify.com/v1/me/player/devices"
    headers = {Authorization: "Bearer #{user.access_token}"}
    devices = RestClient.get url, headers
    thatsmyjam_id=JSON.parse(devices.body)["devices"].find {|device| device["name"]="ThatsMyJam"}["id"]

    ############ TRANSFER PLAYBACK
    params = {}
    params["device_ids"] = []
    params["device_ids"].push(thatsmyjam_id)
    headers = {Authorization: "Bearer #{user.access_token}"}
    url = "https://api.spotify.com/v1/me/player"
    RestClient.put url, params.to_json, headers

    ############## LOAD PLAYLIST
    tracks = playlist.tracks
    params = {}
    params["uris"] = []
    tracks.each do |track|
      params["uris"].push("spotify:track:#{track.spotify_track_id}")
    end
    headers = {Authorization: "Bearer #{user.access_token}"}
    url = "https://api.spotify.com/v1/me/player/play"
    RestClient.put url, params.to_json, headers
  end

  def next
    response = JSON.parse(request.body.read)
    playlist = Playlist.find(response)
    user = playlist.selection.user
    headers = {Authorization: "Bearer #{user.access_token}"}
    url = "https://api.spotify.com/v1/me/player/next"
    RestClient.post url, "", headers
  end

  def previous
    response = JSON.parse(request.body.read)
    playlist = Playlist.find(response)
    user = playlist.selection.user
    headers = {Authorization: "Bearer #{user.access_token}"}
    url = "https://api.spotify.com/v1/me/player/previous"
    RestClient.post url, "", headers
  end
end
