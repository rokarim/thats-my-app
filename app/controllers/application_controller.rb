class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery unless: -> { request.format.json? }

  def after_sign_in_path_for(resource)
    login_index_path
  end

  def refresh_token(user)
    if((Time.now - user.updated_at) > 3000)
      body = {
        grant_type: "authorization_code",
        refresh_token: user.refresh_token,
        redirect_uri: ENV['REDIRECT_URI'],
        client_id: ENV['CLIENT_ID'],
        client_secret: ENV['CLIENT_SECRET']
      }
      authorization_response = RestClient.post('https://accounts.spotify.com/api/token', body)
      authorization_params = JSON.parse(authorization_response.body)
      user.update(access_token: authorization_params["access_token"])
      RestClient.post('https://accounts.spotify.com/api/token', body)
      if JSON.parse(e.response.body)["error"] != "invalid_request"
        authorization_params = JSON.parse(authorization_response.body)
        user.update(access_token: authorization_params["access_token"])
      else
        redirect_to login_index_path
        binding.pry
        return :invalid_request
      end
    end
  end
end
