module Bussiness::Theme
  class Command::CreateCommand < Bussiness::Base::Command
    attribute :access_key, :string
    validates :access_key, presence: true
    attribute :name, :string
    validates :name, presence: true
    attribute :description, :string

    def call
      theme = Bussiness::Theme::Theme.new(name: name, description: description)
      user_id = AuthManager.authenticate(access_key)
      theme = Repository.add(theme, user_id)
      theme
    end
  end
end