module Queries
  class Profile < BaseQuery
    type Types::Profile::ProfileType, null: false

    def resolve()
      user = User.find(context[:current_user_id])
      {
        disp_name: user.disp_name,
        email: user.email,
      }
    end
  end
end