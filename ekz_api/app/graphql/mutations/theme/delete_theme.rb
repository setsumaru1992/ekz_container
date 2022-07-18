module Mutations::Theme
  class DeleteTheme < BaseMutation
    argument :id, Int, required: true

    def resolve(access_key:, id:)
      Bussiness::Theme::Command::CreateCommand.call(
        id: id,
      )
      {}
    end
  end
end