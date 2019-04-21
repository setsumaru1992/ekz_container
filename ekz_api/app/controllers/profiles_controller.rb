class ProfilesController < AbstractMypageController
  def index
    user = User.find(@user_id)
    render json: {
      disp_name: user.disp_name,
      email: user.email,
    }
  end
end
