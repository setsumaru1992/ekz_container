module Bussiness::Chioce
  class Command::CreateCommand < Bussiness::Base::Command
    attribute :name, :string
    validates :name, presence: true
    attribute :url, :string
    attribute :description, :string
    attribute :evaluation, :integer

    def call
      choice = Bussiness::Choice::Choice.new(name: name, url: url, description: description, evaluation: evaluation)
      new_choice = Repository.add(choice)
      new_choice
    end
  end
end