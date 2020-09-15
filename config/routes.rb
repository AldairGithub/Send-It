Rails.application.routes.draw do

  resources :users

  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  get '/users/:id/user_list', to: 'users#user_list'
  get '/users/:id/user_friends', to: 'users#user_friends'

  resources :user_relationships
  resources :actions
  resources :tags
  resources :entities
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
