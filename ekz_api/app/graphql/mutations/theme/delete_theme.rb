module Mutations::Theme
  class DeleteTheme < ::Mutations::BaseMutation
    argument :id, Int, required: true

    def resolve(access_key:, id:)
      Bussiness::Theme::Command::CreateCommand.call(
        id: id,
      )
      {}
    end
  end
end