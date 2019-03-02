class SessionsController < ApplicationController
  def create
    response_hash = {
      isLoginSuccess: false
    }
    user = User.find_by(email: params[:email])
    return render json: response_hash unless user && !!user.authenticate(params[:password])
    response_hash[:isLoginSuccess] = true
    render json: response_hash
  end

  def destroy
  end
end
