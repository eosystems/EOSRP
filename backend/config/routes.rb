Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api, defaults: { format: :json } do
    resources :ship_types, only: [:index]
    resources :guarantee_types
    resources :guarantees, only: [:index]
    put '/guarantees/update_all' => 'guarantees#update_all'
    resources :srp_destinations
    resources :srp_requests
    resources :srp_approvals
    resources :zkills, only: [:index]
    resources :users, only: [] do
      collection do
        get :me
      end
    end
  end
end
