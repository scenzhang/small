Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resources :articles, only: %i(create index show update destroy)
    resources :responses, only: %i(create show update destroy)
    
    resource :session, only: %i(create destroy)
    
  end
end
