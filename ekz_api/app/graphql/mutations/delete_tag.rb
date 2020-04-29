module Mutations
  class DeleteTag < BaseMutation
    argument :id, Int, required: true

    field :id, Int, null: true

    def resolve(id:)
      choice_tag = ChoiceTag.find(id)
      choice_tag.destroy
      {id: id}
    end
  end
end