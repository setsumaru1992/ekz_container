class SignupsController < ApplicationController
  def regist
    user_entity = Ekz::User::UserEntity.new
    user_entity.save_new_model(signup_params)
    render json: {}
  end

  private

  def signup_params
    params.permit(:disp_name, :email, :password, :password_confirmation)
  end
end
