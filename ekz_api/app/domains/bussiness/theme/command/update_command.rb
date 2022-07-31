module Bussiness::Theme
  class Command::UpdateCommand < Bussiness::Base::Command
    attribute :id, :integer
    validates :id, presence: true
    attribute :user_id, :integer
    validates :user_id, presence: true
    attribute :name, :string
    validates :name, presence: true
    attribute :description, :string

    def call
      theme = Repository.find(id)
      theme.name = name
      theme.description = description

      Repository.update(theme, user_id)

      nil
    end
  end
end