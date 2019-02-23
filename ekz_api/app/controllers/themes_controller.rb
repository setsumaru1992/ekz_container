class ThemesController < ApplicationController

  def index
  end

  def show
    render json: {
      theme_list: ThemeDomain::Entity.new.list(theme_params(params))
    }
  end

  def new
    ThemeDomain::Entity.new.create(theme_params(params))
    render json: {}
  end

  def update
  end

  def destroy
    ThemeDomain::Entity.new.destroy(theme_params(params))
    render json: {}
  end

  private

  def theme_params(params)
    params.permit(:id, :name, :description)
  end
end
