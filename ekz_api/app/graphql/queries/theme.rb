module Queries
  class Theme < BaseQuery
    type Types::Theme::ThemeType, null: true

    def resolve(theme_id:)
      ::Theme.find(theme_id)
    end
  end
end