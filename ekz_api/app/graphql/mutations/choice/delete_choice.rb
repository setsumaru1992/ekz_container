module Mutations::Choice
  class DeleteChoice < ::Mutations::BaseMutation
    argument :id, Int, required: true

    field :id, Int, null: false

    def resolve(id:)
      Bussiness::Choice::Command::DeleteCommand.call(
        id: id,
        )
      {
        id: id
      }
    end
  end
end