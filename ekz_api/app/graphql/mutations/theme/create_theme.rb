module Mutations::Theme
  class CreateTheme < BaseMutation
    argument :access_key, String, required: true
    argument :name, String, required: true

    field :id, Int, null: false

    def resolve(access_key:, name:)
      theme = Bussiness::Theme::Command::CreateCommand.call(access_key: access_key, name: name)
      { id: theme.id }
    end
  end
end