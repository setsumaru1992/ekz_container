module Queries
  class Themes < BaseQuery
    type [Types::Theme::ThemeType], null: false

    def resolve()
      Application::Finder::ThemeFinder.call(user_id: context[:current_user_id])
    end
  end
end