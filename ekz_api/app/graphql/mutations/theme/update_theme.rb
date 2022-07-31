module Mutations::Theme
  class UpdateTheme < ::Mutations::BaseMutation
    argument :id, Int, required: true
    argument :name, String, required: true
    argument :description, String, required: false

    field :id, Int, null: false

    def resolve(id:, name:, description: nil)
      Bussiness::Theme::Command::UpdateCommand.call(
        id: id,
        user_id: context[:current_user_id],
        name: name,
        description: description,
        )
      { id: id }
    end
  end
end