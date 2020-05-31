module Types
  module Theme
    class ThemeType < Types::BaseObject
      field :id, Int, null: false
      field :name, String, null: false
      field :description, String, null: true
    end
  end
end
