class SessionsController < ApplicationController
  def create
    response_hash = login_fail_response_hash
    user = User.find_by(email: session_params[:email])
    return render json: response_hash unless user && !!user.authenticate(session_params[:password])

    response_hash = login_success_response_hash(AuthManager.generate_access_key(user.id))
    response_hash[:user] = user_hash(user)

    if session_params[:autologin]
      response_hash[:remind_token] = AuthManager.remind_token_from(user.id)
    end

    render json: response_hash
  end

  def is_valid
    render json: {
      is_valid: !!AuthManager.authenticate(session_params[:access_key])
    }
  end

  def destroy
    AuthManager.destroy_access_key(session_params[:access_key])
    render json: {}
  end

  def is_valid_remind_token
    response_hash = login_fail_response_hash
    access_key = AuthManager.generate_access_key_from(session_params[:remind_token])
    return render json: response_hash if access_key.nil?
    render json: login_success_response_hash(access_key)
  end

  private

  def session_params
    params.permit(:email, :password, :access_key, :remind_token, :autologin)
  end

  def user_hash(user_model)
    {
      disp_name: user_model.disp_name,
    }
  end

  def login_fail_response_hash
    {
      is_login_success: false,
      access_key: nil,
    }
  end

  def login_success_response_hash(access_key)
    {
      is_login_success: true,
      access_key: access_key,
    }
  end
end