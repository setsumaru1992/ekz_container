module Bussiness::Choice
  class Command::CreateCommand < Bussiness::Base::Command
    attribute :name, :string
    validates :name, presence: true
    attribute :url, :string
    attribute :description, :string
    attribute :evaluation, :integer
    attribute :theme_id, :integer
    validates :theme_id, presence: true

    def call
      choice = Bussiness::Choice::Choice.new(name: name, url: url, description: description, evaluation: evaluation, theme_id: theme_id)
      new_choice = Repository.add(choice)
      new_choice
    end
  end
end