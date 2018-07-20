Rails.application.routes.draw do
  # redirects all routes to / if user requests html
  get "*path", to: "pages#index", constraints: -> (request) {request.format.html?}
  resources :points
  resources :tours
  resources :staff_users
  resources :cultural_centers
  resources :sessions, only: [:create, :delete]
  root to: "pages#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
