module Types
  class QueryType < Types::BaseObject
    field :tags, resolver: Queries::Tags do
      argument :choice_id, Int, required: true
    end

    field :themes, resolver: Queries::Themes do
      argument :access_key, String, required: true
    end

    field :profile, resolver: Queries::Profile do
      argument :access_key, String, required: true
    end 
  end
end
