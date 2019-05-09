require 'rest-client'

class Api::V1::SelectionsController < ApplicationController
  serialization_scope :current_user
  before_action :require_authorization

  def require_authorization
    # if((Time.now - current_user.updated_at) > 3400)
    #   body = {
    #     grant_type: "authorization_code",
    #     refresh_token: current_user.refresh_token,
    #     redirect_uri: ENV['REDIRECT_URI'],
    #     client_id: ENV['CLIENT_ID'],
    #     client_secret: ENV['CLIENT_SECRET']
    #   }
    #   auth_response = RestClient.post('https://accounts.spotify.com/api/token', body)
    #   auth_params = JSON.parse(auth_response.body)
    #   current_user.update(access_token: auth_params["access_token"])
    # end
    # headers = {
    #   Authorization: "Bearer #{current_user.access_token}"
    # }
  end

  def new
    user_info = current_user.id
    genres = Genre.all
    audio_features = AudioFeature.all
    render json: {:genres => genres, :audio_features => audio_features, :user_info => user_info}
  end

  def create
    response = JSON.parse(request.body.read)

    criteria = Selection.create(audio_feature_id: response["activity"].to_i, user_id: response["user_info"].to_i)
    SelectionGenre.create(selection_id: criteria.id, genre_id: response["genres"][0]["id"].to_i)
    new_playlist = Playlist.create(name: response["name"], selection_id: criteria.id)

    user = User.find(response["user_info"])
    options = AudioFeature.find(response["activity"].to_i)
    options = options.as_json.compact
    options["limit"] = 100
    options["seed_genres"] = response["genres"][0]["name"]

    url = 'https://api.spotify.com/v1/recommendations'
    headers= {Authorization: "Bearer #{user.access_token}", params: options}
    recommendations = RestClient.get url, headers

    JSON.parse(recommendations)["tracks"].each do |track|
      Track.create(playlist_id: new_playlist.id, spotify_track_id: track["id"], name: track["name"], artist: track["artists"][0]["name"])
    end

    render json: new_playlist.id
    # render json: ActiveModelSerializers::SerializableResource.new(JSON.parse(recommendations), each_serializer: SelectionSerializer)
  end
end
