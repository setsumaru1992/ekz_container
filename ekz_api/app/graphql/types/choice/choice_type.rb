module Types
  module Choice
    class ChoiceType < Types::BaseObject
      field :id, Int, null: false
      field :name, String, null: false
      field :url, String, null: true
      field :description, String, null: true
      field :evaluation, Int, null: true
      field :theme_id, Int, null: false
      field :image_url, String, null: false
    end
  end
end
