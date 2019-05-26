class ChoiceImagesController < ApplicationController
  def index
  end

  def new
    choice_entity = Ekz::ChoiceFactory.create_by_choice_id(choice_params[:choice_id])
    choice_entity.create_image(choice_params)
    render json: {}
  end

  private

  def choice_params
    params.permit(
      :id, :name, :url, :evaluation, :description, :theme_id, :ids,
      :description, :choice, :choice_id, :image,
    )
  end
end
