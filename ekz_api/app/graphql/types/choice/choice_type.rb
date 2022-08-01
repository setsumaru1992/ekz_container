module Types
  module Choice
    class ChoiceType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: false
      field :url, String, null: true
      field :description, String, null: true
    end
  end
end
