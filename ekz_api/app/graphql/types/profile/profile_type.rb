module Types
  module Profile
    class ProfileType < Types::BaseObject
      field :disp_name, String, null: false
      field :email, String, null: false
    end
  end
end
