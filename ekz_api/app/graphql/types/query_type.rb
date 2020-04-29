module Types
  class QueryType < Types::BaseObject
    field :tags, resolver: Queries::Tags do
      argument :choice_id, Int, required: true
    end
  end
end
