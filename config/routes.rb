Rails.application.routes.draw do



  # creates users, gets all users
  resources :users

  # authorization
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  # requests forgot and reset passwords
  post '/password/forgot', to: 'passwords#forgot'
  post '/password/reset', to: 'passwords#reset'

  # user friends
  get '/users/:id/user_list', to: 'users#user_list'
  get '/users/:id/user_friends', to: 'users#user_friends'

  # user entities
  get '/entities/user/:id', to: 'entities#user_entities'
  
  resources :user_relationships
  resources :actions
  resources :tags
  resources :entities
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
