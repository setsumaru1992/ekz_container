module Mutations::Theme
  class UpdateTheme < ::Mutations::BaseMutation
    argument :id, Int, required: true
    argument :access_key, String, required: true
    argument :name, String, required: true
    argument :description, String, required: false

    field :id, Int, null: false

    def resolve(access_key:, id:, name:, description: nil)
      Bussiness::Theme::Command::UpdateCommand.call(
        id: id,
        access_key: access_key,
        name: name,
        description: description,
        )
      { id: id }
    end
  end
end