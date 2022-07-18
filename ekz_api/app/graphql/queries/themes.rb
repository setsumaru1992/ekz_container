module Queries
  class Themes < BaseQuery
    type [Types::Theme::ThemeType], null: false

    def resolve(access_key:)
      Application::Finder::ThemeFinder.call(access_key: access_key)
    end
  end
end