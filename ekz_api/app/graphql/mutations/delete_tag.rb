module Mutations
  class DeleteTag < BaseMutation
    argument :id, Int, required: true

    field :id, Int, null: true

    def resolve(id:)
      tag = ChoiceTag.find(id)
      tag.destroy
      {id: id}
    end
  end
end