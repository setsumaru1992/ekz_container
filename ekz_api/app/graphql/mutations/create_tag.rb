module Mutations
  class CreateTag < BaseMutation
    argument :choice_id, Int, required: true
    argument :name, String, required: true

    field :id, Int, null: true

    def resolve(choice_id:, name:)
      tag = Choice.find(choice_id).choice_tags.build
      tag.name = name
      tag.save!
      {id: tag.id}
    end
  end
end