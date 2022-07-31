module Bussiness::Theme
  class Command::CreateCommand < Bussiness::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true
    attribute :name, :string
    validates :name, presence: true
    attribute :description, :string

    def call
      theme = Bussiness::Theme::Theme.new(name: name, description: description)
      new_theme = Repository.add(theme, user_id)
      new_theme
    end
  end
end