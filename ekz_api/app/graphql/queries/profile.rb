module Queries
  class Profile < BaseQuery
    type Types::Profile::ProfileType, null: false

    def resolve(access_key:)
      user_id = AuthManager.authenticate(access_key)
      user = User.find(user_id)
      {
        disp_name: user.disp_name,
        email: user.email,
      }
    end
  end
end