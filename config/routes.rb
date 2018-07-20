Rails.application.routes.draw do
  resources :points
  resources :tours
  resources :staff_users
  resources :cultural_centers
  resources :sessions, only: [:create, :delete]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
