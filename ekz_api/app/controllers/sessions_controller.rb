class SessionsController < ApplicationController
  def create
    response_hash = {
      is_login_success: false,
      access_key: nil,
    }
    user = User.find_by(email: session_params[:email])
    return render json: response_hash unless user && !!user.authenticate(session_params[:password])

    response_hash[:is_login_success] = true
    response_hash[:user] = user_hash(user)
    response_hash[:access_key] = AuthManager.generate_access_key(user.id)

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

  private

  def session_params
    params.permit(:email, :password, :access_key)
  end

  def user_hash(user_model)
    {
      disp_name: user_model.disp_name,
    }
  end


end