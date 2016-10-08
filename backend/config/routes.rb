Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api, defaults: { format: :json } do
    resources :ship_types, only: [:index]
    resources :guarantee_types
    resources :guarantees, only: [:index]
    put '/guarantees/update_all' => 'guarantees#update_all'
    resources :srp_destinations
    resources :zkills, only: [:index]
  end
end
