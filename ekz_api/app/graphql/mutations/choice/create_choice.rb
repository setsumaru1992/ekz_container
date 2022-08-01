module Mutations::Choice
  class CreateChoice < ::Mutations::BaseMutation
    argument :name, String, required: true
    argument :url, String, required: false
    argument :description, String, required: false
    argument :evaluation, Int, required: false

    field :choice, Types::Choice::ChoiceType, null: true

    def resolve(name:, url: nil, description: nil, evaluation: nil)
      choice = Bussiness::Chioce::Command::CreateCommand.call(
        name: name,
        url: url,
        description: description,
        evaluation: evaluation,
        )
      {
        id: choice.id,
        name: choice.name,
        url: choice.url,
        description: choice.description,
        evaluation: choice.evaluation,
      }
    end
  end
end