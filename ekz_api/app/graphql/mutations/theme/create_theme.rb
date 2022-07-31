module Mutations::Theme
  class CreateTheme < ::Mutations::BaseMutation
    argument :name, String, required: true
    argument :description, String, required: false

    field :id, Int, null: false

    def resolve(name:, description: nil)
      theme = Bussiness::Theme::Command::CreateCommand.call(
        user_id: context[:current_user_id],
        name: name,
        description: description,
      )
      { id: theme.id }
    end
  end
end