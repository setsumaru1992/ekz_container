module Types
  class QueryType < Types::BaseObject
    field :tags, resolver: Queries::Tags do
      argument :choice_id, Int, required: true
    end

    field :themes, resolver: Queries::Themes
    field :theme, resolver: Queries::Theme do
      argument :theme_id, Int, required: true
    end

    field :ekz, resolver: Queries::Ekz do
      argument :theme_id, Int, required: true
      argument :pre_picked_choice_id, Int, required: false
    end

    field :choices, resolver: Queries::Choices do
      argument :theme_id, Int, required: true
    end

    field :profile, resolver: Queries::Profile
  end
end
