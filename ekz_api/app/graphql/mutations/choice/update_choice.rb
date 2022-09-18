module Mutations::Choice
  class UpdateChoice < ::Mutations::BaseMutation
    argument :id, Int, required: true
    argument :name, String, required: true
    argument :url, String, required: false
    argument :description, String, required: false
    argument :evaluation, Int, required: false

    field :choice, Types::Choice::ChoiceType, null: false

    def resolve(id:, name:, url: nil, description: nil, evaluation: nil)
      choice = Bussiness::Choice::Command::UpdateCommand.call(
        id: id,
        name: name,
        url: url,
        description: description,
        evaluation: evaluation,
        )
      {
        choice: {
          id: choice.id,
          name: choice.name,
          url: choice.url,
          description: choice.description,
          evaluation: choice.evaluation,
          theme_id: choice.theme_id,
        }
      }
    end
  end
end