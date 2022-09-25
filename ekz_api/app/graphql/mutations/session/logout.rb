module Mutations::Session
  class Logout < ::Mutations::BaseMutation
    argument :access_key, String, required: true

    field :access_key, String, null: true

    def resolve(access_key:)
      AuthManager.destroy_access_key(access_key)
      {
        access_key: access_key,
      }
    end
  end
end
