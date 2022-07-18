module Bussiness::Theme
  class Command::UpdateCommand < Bussiness::Base::Command
    attribute :id, :integer
    validates :id, presence: true
    attribute :access_key, :string
    validates :access_key, presence: true
    attribute :name, :string
    validates :name, presence: true
    attribute :description, :string

    def call
      theme = Repository.find(id)
      theme.name = name
      theme.description = description

      user_id = AuthManager.authenticate(access_key)
      Repository.update(theme, user_id)

      nil
    end
  end
end