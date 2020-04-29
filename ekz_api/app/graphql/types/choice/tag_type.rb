module Types
  module Choice
    class TagType < Types::BaseObject
      field :id, Int, null: false
      field :name, String, null: false
      field :choice_id, Int, null: false
    end
  end
end