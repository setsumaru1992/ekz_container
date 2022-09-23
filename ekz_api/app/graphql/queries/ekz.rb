module Queries
  class Ekz < BaseQuery
    type Types::Choice::ChoiceType, null: true

    def resolve(theme_id:, pre_picked_choice_id:)
      choice = ::Application::Finder::EkzPicker.call(theme_id: theme_id, pre_picked_choice_id: pre_picked_choice_id)
      return {} if choice.blank?

      {
        id: choice["id"],
        name: choice["name"],
        url: choice["url"],
        description: choice["description"],
        evaluation: choice["evaluation"],
        theme_id: choice["theme_id"],
        image_url: choice["image_url"],
      }
    end
  end
end