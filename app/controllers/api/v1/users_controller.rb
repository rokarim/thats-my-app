require 'rest-client'

class Api::V1::UsersController < ApplicationController
  serialization_scope :current_user

  def index
    if params[:error]
      puts "Login Error", params
      redirect_to "http://localhost:3000/login/failure"
    else
      body = {
        grant_type: "authorization_code",
        code: params[:code],
        redirect_uri: ENV['REDIRECT_URI'],
        client_id: ENV['CLIENT_ID'],
        client_secret: ENV['CLIENT_SECRET']
      }
      auth_response = RestClient.post('https://accounts.spotify.com/api/token', body)
      auth_params = JSON.parse(auth_response.body)
    end
    header = {
      Authorization: "Bearer #{auth_params["access_token"]}"
    }
    user_response = RestClient.get("https://api.spotify.com/v1/me", header)
    user_params = JSON.parse(user_response.body)

    @user = User.find(current_user.id)
    @user.update(username: user_params["id"], access_token: auth_params["access_token"], refresh_token: auth_params["refresh_token"])

    # @user = User.find_or_create_by(
    #   username: user_params["id"],
    #   spotify_url: user_params["external_urls"]["spotify"],
    #   href: user_params["href"],
    #   uri: user_params["uri"])
    #
    # @user.update(access_token: auth_params["access_token"], refresh_token: auth_params["refresh_token"])
    redirect_to "/playlists"
  end
end
