module Bussiness::Choice
  class Choice < Bussiness::Base::Entity
    attribute :id, :integer
    attribute :name, :string
    attribute :url, :string
    attribute :description, :string
    attribute :evaluation, :integer
    attribute :theme_id, :integer
  end
end