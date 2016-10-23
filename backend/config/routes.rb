Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: 'overrides/omniauth_callbacks'
  }

  namespace :api, defaults: { format: :json } do
    resources :ship_types, only: [:index]
    resources :guarantee_types
    resources :guarantees, only: [:index]
    get '/guarantees/guarantee_price_by_ship_and_guarantee_type' => 'guarantees#guarantee_price_by_ship_and_guarantee_type'
    get '/guarantees/default_srp' => 'guarantees#default_srp'
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
