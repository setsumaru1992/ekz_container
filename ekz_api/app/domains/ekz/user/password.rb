module Ekz::User
  class Password
    attr_accessor :password, :password_confirmation

    def initialize(password, password_confirmation)
      @password, @password_confirmation = valid_password(password, password_confirmation)
    end

    private

    def valid_password(password, password_confirmation)
      if password.empty?
        raise(Ekz::InvalieValueError, "パスワードが空です。")
      end
      if password_confirmation.present? && password != password_confirmation
        raise(Ekz::InvalieValueError, "パスワードが一致しません。")
      end

      [password, password_confirmation]
    end

  end
end