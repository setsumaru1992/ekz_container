module Mutations::Theme
  class DeleteTheme < ::Mutations::BaseMutation
    argument :access_key, String, required: true
    argument :id, Int, required: true

    field :id, Int, null: false

    def resolve(access_key:, id:)
      Bussiness::Theme::Command::DeleteCommand.call(
        id: id,
      )

      { id: id }
    end
  end
end