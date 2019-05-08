require 'rest-client'

class Api::V1::PlaylistsController < ApplicationController
  serialization_scope :current_user
  before_action :require_login

  def require_login

  end

  def index
    render json: User.find(current_user.id).playlists
  end

  def show
    options = {
      limit: 100,
      seed_genres: ['acoustic', 'ambient', 'chill', 'study', 'piano'],
      min_danceability: 0.3,
      max_danceability: 0.6,
      max_energy: 0.4,
      min_instrumentalness: 0.5,
      max_speechness: 0.1,
      max_valence: 0.5
    }

    recommendations = RestClient::Request.execute(method: :get,
      url: 'https://api.spotify.com/v1/recommendations?limit=10&seed_genres=chill&min_danceability=0.3&max_danceability=0.6&min_energy=0.4&min_instrumentalness=0.5&max_speechiness=0.1&max_valence=0.5',
      headers: {Authorization: "Bearer #{params[:id]}"})

    render json: recommendations
  end

  def new
    genres = Genre.all
    audio_features = AudioFeature.all
    render json: {:genres => genres, :audio_features => audio_features}
  end
  
  def create

  end
end
