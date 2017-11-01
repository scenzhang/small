Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :users, only: %i(create show)
    resources :articles, only: %i(create index show update destroy)
    get '/articles/:id/responses', to: 'articles#responses', as: :article_responses
    resources :responses, only: %i(create show update destroy)
    get '/responses/:id/replies', to: 'responses#replies', as: :response_replies
    resource :session, only: %i(create destroy)
    
  end
end
