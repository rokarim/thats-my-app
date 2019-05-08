class Api::V1::GenresController < ApplicationController
  serialization_scope :current_user

  def search
    genres = Genre.where("name ILIKE ?", "%#{params['search_string']}%")
    render json: genres
  end
end
