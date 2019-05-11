Rails.application.routes.draw do
  devise_for :users
  root 'playlists#index'
  get 'login/callback', to: 'login#callback'
  resources :playlists, only: [:index]
  resources :login, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :playlists, only: [:index, :show, :new, :create, :destroy]
      resources :spotify, only: [:create]
      post '/genres/search', to: 'genres#search'
    end
  end

end
