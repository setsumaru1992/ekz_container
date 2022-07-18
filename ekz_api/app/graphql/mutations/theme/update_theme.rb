module Mutations::Theme
  class UpdateTheme < ::Mutations::BaseMutation
    argument :id, Int, required: true
    argument :access_key, String, required: true
    argument :name, String, required: true
    argument :description, String, required: false

    def resolve(access_key:, name:)
      Bussiness::Theme::Command::UpdateCommand.call(
        id: id,
        access_key: access_key,
        name: name,
        description: description,
        )
      {}
    end
  end
end