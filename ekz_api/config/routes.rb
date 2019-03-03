Rails.application.routes.draw do
  scope :api do
    scope :v1 do
      namespace :themes do
        get    'show'
        get    'index'
        post   'new'
        patch  'update'
        delete 'destroy'
      end

      namespace :choices do
        get    'show'
        get    'show_by_ids'
        get    'ekz'
        post   'new'
        patch  'update'
        patch  'update_evaluation'
        delete 'destroy'
      end

      namespace :sessions do
        post   "is_valid"
        post   "login", action: :create
        delete "logout", action: :destroy
      end
    end
  end
end
