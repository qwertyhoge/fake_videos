Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  # namespace :api do
  #   namespace :v1 do
  #     get 'hello', to: 'hello#index'
  #   end
  # end

  namespace :api do
    get    "/videos",     to: "videos#index"
    get    "/videos/:id", to: "videos#show"
    post   "/videos",     to: "videos#create"
    patch  "/videos/:id", to: "videos#update"
    delete "/videos/:id", to: "videos#destroy"

    get    "/users",      to: "users#index"
    get    "/users/:id",  to: "users#show"
    post   "/users",      to: "users#create"
    patch  "/users/:id",  to: "users#update"
    delete "/users/:id",  to: "users#destroy"
  
    get    "/tags",       to: "tags#index"
    post   "/tags",       to: "tags#create"
    delete "/tags/:id",   to: "tags#destroy"
  end

end
