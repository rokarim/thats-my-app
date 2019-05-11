Rails.application.routes.draw do
  devise_for :users
  root 'playlists#index'

  resources :playlists, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :playlists, only: [:index, :show, :new, :create, :destroy]
      resources :login, only: [:index]
      resources :users, only: [:index]
      post '/genres/search', to: 'genres#search'
    end
  end

end
