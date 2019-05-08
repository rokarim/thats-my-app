require 'rspotify'

class CriteriasController < ApplicationController
 def index
   # spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
   # @email = spotify_user.email
   #
   render :index
 end
end
