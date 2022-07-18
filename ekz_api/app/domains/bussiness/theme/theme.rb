module Bussiness::Theme
  class Theme < Bussiness::Base::Entity
    attribute :id, :integer
    attribute :name, :string
    attribute :description, :string
  end
end