module Ekz::User
  class Email
    attr_accessor :email

    def initialize(email)
      @email = valid_email(email)
    end

    private

    def valid_email(email)
      if email.empty?
        raise(Ekz::InvalieValueError, "メールアドレスが空です。")
      end
      unless email.match(/\A[a-zA-Z0-9_\#!$%&`'*+\-{|}~^\/=?\.]+@[a-zA-Z0-9][a-zA-Z0-9\.-]+\z/)
        raise(Ekz::InvalieValueError, "メールアドレスの形式が正しくありません。")
      end
      email
    end

  end
end