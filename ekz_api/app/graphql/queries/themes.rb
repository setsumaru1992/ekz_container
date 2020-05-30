module Queries
  class Themes < BaseQuery
    type [Types::Theme::ThemeType], null: false

    def resolve(choice_id:)
      Theme.find_with_last_choice_updated(choice_id)
    end
  end
end