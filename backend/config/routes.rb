Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api, defaults: { format: :json } do
    resources :ship_types, only: [:index]
    resources :guarantee_types
  end
end
