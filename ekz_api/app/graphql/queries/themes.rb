module Queries
  class Themes < BaseQuery
    type [Types::Theme::ThemeType], null: false

    def resolve(access_key:)
      user_id = AuthManager.authenticate(access_key)
      Theme.find_with_last_choice_updated(user_id)
    end
  end
end