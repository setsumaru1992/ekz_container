class ThemesController < AbstractMypageController

  def index
  end

  def show
    render json: {
      theme_list: Theme.find_with_last_choice_updated(@user_id)
    }
  end

  def new
    theme_entity = Ekz::ThemeFactory.create_by_theme_id(theme_params[:id])
    theme_entity.save_new_model(theme_params, @user_id)
    render json: {}
  end

  def update
    theme_entity = Ekz::ThemeFactory.create_by_theme_id(theme_params[:id])
    theme_entity.update_model(theme_params)
    render json: {}
  end

  def destroy
    theme_entity = Ekz::ThemeFactory.create_by_theme_id(theme_params[:id])
    theme_entity.destroy(theme_params)
    render json: {}
  end

  private

  def theme_params
    params.permit(:id, :name, :description)
  end
end
