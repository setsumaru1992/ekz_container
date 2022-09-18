module Bussiness::Choice
  class Command::UpdateCommand < Bussiness::Base::Command
    attribute :id, :integer
    validates :id, presence: true
    attribute :name, :string
    validates :name, presence: true
    attribute :url, :string
    attribute :description, :string
    attribute :evaluation, :integer
    attribute :theme_id, :integer
    validates :theme_id, presence: true

    def call
      choice = Repository.find(id)

      choice.name = name
      choice.url = url
      choice.description = description
      choice.evaluation = evaluation

      Repository.update(choice)
      choice
    end
  end
end