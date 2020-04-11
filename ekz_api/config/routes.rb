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
        get    'detail'
        post   'new'
        patch  'update'
        patch  'update_evaluation'
        delete 'destroy'

        scope ":choice_id" do
          namespace :tags do
            root action: :index
            post "" , action: :new

            scope ":id" do
              delete "", action: :destroy
            end
          end
        end
      end

      namespace :choice_comments do
        get    'show'
        post   'new'
        patch  'update'
        delete 'destroy'
      end

      namespace :choice_images do
        get    'show'
        post   'new'
        patch  'update'
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
