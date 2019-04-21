Rails.application.routes.draw do
  get 'signups/register'
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
        post   "is_valid_remind_token"
        post   "login", action: :create
        delete "logout", action: :destroy
      end

      namespace :profiles do
        root   action: :index
      end

      scope :signup do
        post   "regist", controller: :signups, action: :regist
      end
    end
  end
end
