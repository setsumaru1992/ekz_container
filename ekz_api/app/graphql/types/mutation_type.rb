module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end

    field :delete_tag, resolver: Mutations::DeleteTag # do
    #   argument :id, Int, required: true
    # end
  end
end
