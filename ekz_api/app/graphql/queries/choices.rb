module Queries
  class Choices < BaseQuery
    type [Types::Choice::ChoiceType], null: false

    def resolve(theme_id:)
      Application::Finder::ChoiceFinder.call(theme_id: theme_id)
    end
  end
end