Rails.application.routes.draw do
  get 'rolls/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'sessions#login'

  resources :users, only: [:create, :destroy]

  get '/sign_up', to: 'users#new'
  get '/login', to: 'sessions#login'
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/logout', to: 'sessions#destroy'
  get '/roller', to: 'roller#index'
  post '/roll', to: 'roller#roll'
  get '/rolls', to: 'rolls#index'
end
