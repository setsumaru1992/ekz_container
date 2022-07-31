module Mutations::Theme
  class DeleteTheme < ::Mutations::BaseMutation
    argument :id, Int, required: true

    field :id, Int, null: false

    def resolve(id:)
      Bussiness::Theme::Command::DeleteCommand.call(
        id: id,
      )

      { id: id }
    end
  end
end