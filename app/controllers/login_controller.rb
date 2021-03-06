class LoginController < ApplicationController
  before_action :authenticate_user!

  def index
    query_params = {
      client_id: ENV['CLIENT_ID'],
      response_type: "code",
      redirect_uri: ENV['REDIRECT_URI'],
      scope: "user-read-recently-played
      user-top-read
      user-library-modify
      user-library-read
      playlist-read-private
      playlist-modify-public
      playlist-modify-private
      playlist-read-collaborative
      user-read-email
      user-read-birthdate
      user-read-private
      user-read-playback-state
      user-modify-playback-state
      user-read-currently-playing
      app-remote-control
      streaming
      user-follow-read
      user-follow-modify",
      show_dialog: true
    }
    url = "http://accounts.spotify.com/authorize/"
    redirect_to "#{url}?#{query_params.to_query}"
  end

  def callback
    if params[:error]
      puts "Login Error", params
      redirect_to "http://thatsmyjamapp.herokuapp/login/failure"
    else
      body = {
        grant_type: "authorization_code",
        code: params[:code],
        redirect_uri: ENV['REDIRECT_URI'],
        client_id: ENV['CLIENT_ID'],
        client_secret: ENV['CLIENT_SECRET']
      }
      authorization_response = RestClient.post('https://accounts.spotify.com/api/token', body)
      authorization_params = JSON.parse(authorization_response.body)
    end
    header = {
      Authorization: "Bearer #{authorization_params["access_token"]}"
    }
    user_response = RestClient.get("https://api.spotify.com/v1/me", header)
    user_params = JSON.parse(user_response.body)
    user = User.find(current_user.id)
    user.update(username: user_params["id"], access_token: authorization_params["access_token"], refresh_token: authorization_params["refresh_token"])
    redirect_to playlists_path
  end
end
