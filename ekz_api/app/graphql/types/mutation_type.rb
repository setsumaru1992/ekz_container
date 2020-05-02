module Types
  class MutationType < Types::BaseObject
    field :delete_tag, resolver: Mutations::DeleteTag
    field :create_tag, resolver: Mutations::CreateTag
  end
end
