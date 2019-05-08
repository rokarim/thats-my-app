class Api::V1::LoginController < ApplicationController
  serialization_scope :current_user

  def index
    query_params = {
      client_id: ENV['CLIENT_ID'],
      response_type: "code",
      redirect_uri: ENV['REDIRECT_URI'],
      scope: "user-read-email playlist-modify-public user-library-read user-library-modify",
      show_dialog: true
    }
    url = "http://accounts.spotify.com/authorize/"
    redirect_to "#{url}?#{query_params.to_query}"
  end
end
