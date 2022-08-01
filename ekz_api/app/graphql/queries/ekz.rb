module Queries
  class Ekz < BaseQuery
    type Types::Choice::ChoiceType, null: true

    def resolve(theme_id:)
      choice = Choice.find(523) # Choice.where(theme_id: theme_id).last
      return {} if choice.blank?

      {
        id: choice.id,
        name: choice.name,
        url: choice.url,
        description: choice.description,
      }
    end
  end
end