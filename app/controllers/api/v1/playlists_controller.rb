require 'rest-client'

class Api::V1::PlaylistsController < ApplicationController
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

  def index
    render json: User.find(current_user.id).playlists
  end

  def show
    render json: Playlist.find(params[:id])
  end

  def new
    genres = Genre.all
    audio_features = AudioFeature.all
    render json: {:genres => genres, :audio_features => audio_features}
  end

  def create
    response = JSON.parse(request.body.read)

    options = AudioFeatures.find(response.activity)
    opions.limit = 100
    options.seed_genres = ""
    url = 'https://api.spotify.com/v1/recommendations'
    headers= {Authorization: "Bearer #{current_user.access_token}", params: options}
    binding.pry
    recommendations = RestClient.get url, headers

    render json: recommendations

  end
end
