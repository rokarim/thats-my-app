Rails.application.routes.draw do
  devise_for :users
  root 'playlists#index'

  resources :playlists, only: [:index, :new, :create]

  namespace :api do
    namespace :v1 do
      resources :playlists, only: [:index, :show, :new, :create]
      resources :selections, only: [:show, :new, :create]
      resources :login, only: [:index, :new, :create]
      resources :users, only: [:index, :new, :create]
      post '/genres/search', to: 'genres#search'
    end
  end

end
