require 'rest-client'

class Api::V1::PlaylistsController < ApplicationController
  def index
    render json: User.find(current_user.id).playlists
  end

  def show
    render json: Playlist.find(params[:id])
  end

  def new
    user_info = current_user.id
    genres = Genre.all
    audio_features = AudioFeature.all
    render json: {:genres => genres, :audio_features => audio_features, :user_info => user_info}
  end

  def create
    response = JSON.parse(request.body.read)
    user = User.find(response["user_info"].to_i)
    refresh_token(user)
    selection = Selection.create(audio_feature_id: response["activity"].to_i, user_id: response["user_info"].to_i)
    selection_genre = SelectionGenre.create(selection_id: selection.id, genre_id: response["genres"][0]["id"].to_i)
    new_playlist = Playlist.create(name: response["name"], selection_id: selection.id)

    options = AudioFeature.find(response["activity"].to_i)
    options = options.as_json.compact
    options["limit"] = 100
    options["seed_genres"] = response["genres"][0]["name"]
    if response["genres"][1]
      options["seed_genres"] << ","
      options["seed_genres"] << response["genres"][1]["name"]
    end

    url = 'https://api.spotify.com/v1/recommendations'
    headers= {Authorization: "Bearer #{user.access_token}", params: options}
    recommendations = RestClient.get url, headers

    JSON.parse(recommendations)["tracks"].each do |track|
      Track.create(playlist_id: new_playlist.id, spotify_track_id: track["id"], name: track["name"], artist: track["artists"][0]["name"])
    end

    render json: new_playlist
  end

  def update
    accurate_playlist = Playlist.find(params[:id])
    accurate_playlist.accurate = true
    accurate_playlist.save

    render json: accurate_playlist.id
  end

  def destroy
    playlist = Playlist.find(params[:id])
    playlist.destroy
    render json: playlist.id
  end
end
