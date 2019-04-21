module Ekz::User
  class UserEntity
    def initialize(user_id: nil)
      if user_id.blank?
        @user_model = ::User.new
      else
        @user_model = ::User.find(user_id)
      end
    end

    def save_new_model(params)
      email_obj = build_email_obj(params[:email])
      password_obj = build_password_obj(params[:password], params[:password_confirmation])
      @user_model.attributes = {
        disp_name: params[:disp_name],
        email: email_obj.email,
        password: password_obj.password,
        password_confirmation: password_obj.password_confirmation}
      @user_model.save!
    end

    private

    def build_email_obj(email)
      email_obj = Email.new(email)
      existing_user = ::User.find_by(email: email_obj.email)

      if existing_user.present? && existing_user.id != @user_model.id
        raise(Ekz::InvalieValueError, "メールアドレスはすでに使われています。")
      end
      email_obj
    end

    def build_password_obj(password, password_confirmation)
      Password.new(password, password_confirmation)
    end

  end
end