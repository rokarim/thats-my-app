Rails.application.routes.draw do
  devise_for :users
  root 'playlists#index'
  get 'login/callback', to: 'login#callback'
  resources :playlists, only: [:index]
  resources :login, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :playlists, only: [:index, :show, :new, :update, :create, :destroy]
      resources :spotify, only: [:index, :create, :update]
      post '/spotify/previous', to: 'spotify#previous'
      post '/spotify/next', to: 'spotify#next'
      post '/genres/search', to: 'genres#search'
    end
  end

end
