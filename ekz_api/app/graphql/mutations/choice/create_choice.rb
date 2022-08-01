module Mutations::Choice
  class CreateChoice < ::Mutations::BaseMutation
    argument :name, String, required: true
    argument :url, String, required: false
    argument :description, String, required: false
    argument :evaluation, Int, required: false
    argument :theme_id, Int, required: true

    field :choice, Types::Choice::ChoiceType, null: false

    def resolve(name:, url: nil, description: nil, evaluation: nil, theme_id:)
      choice = Bussiness::Choice::Command::CreateCommand.call(
        name: name,
        url: url,
        description: description,
        evaluation: evaluation,
        theme_id: theme_id,
        )
      {
        choice: {
          id: choice.id,
          name: choice.name,
          url: choice.url,
          description: choice.description,
          evaluation: choice.evaluation,
        }
      }
    end
  end
end