module Mutations::Theme
  class CreateTheme < ::Mutations::BaseMutation
    argument :access_key, String, required: true
    argument :name, String, required: true
    argument :description, String, required: false

    field :id, Int, null: false

    def resolve(access_key:, name:, description: nil)
      theme = Bussiness::Theme::Command::CreateCommand.call(
        access_key: access_key,
        name: name,
        description: description,
      )
      { id: theme.id }
    end
  end
end