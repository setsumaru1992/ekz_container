Rails.application.routes.draw do
  scope :api do
    namespace :choices do
      get    'show'
      get    'random'
      post   'new'
      patch  'update'
      delete 'destroy'
    end

    namespace :themes do
      get    'show'
      get    'index'
      post   'new'
      patch  'update'
      delete 'destroy'
    end
  end
end
