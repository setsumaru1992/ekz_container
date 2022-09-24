module Mutations::Session
  class Login < ::Mutations::BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true
    argument :auto_login, Boolean, required: true

    field :access_key, String, null: true
    field :remind_token, String, null: true

    def resolve(email:, password:, autoLogin:)
      user = ::User.find_by(email: email)
      login_succeed = user && user.authenticate(password)
      unless login_succeed
        return { access_key: nil}
      end

      access_key = AuthManager.generate_access_key(user.id)
      remind_token = if auto_login
                       AuthManager.remind_token_from(user.id)
                     end
      {
        access_key: access_key,
        remind_token: remind_token,
      }
    end

  end
end