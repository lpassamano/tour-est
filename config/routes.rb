Rails.application.routes.draw do
  # redirects all routes to / if user requests html
  get "*path", to: "pages#index", constraints: -> (request) {request.format.html?}
  
  resources :tours do
    resources :points
  end

  resources :staff_users, only: [:index, :create]
  resource :staff_user, only: [:show]
  resources :cultural_centers
  resources :sessions, only: [:create, :delete]
  root to: "pages#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
