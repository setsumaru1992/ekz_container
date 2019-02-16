class ChoicesController < ApplicationController
  def show
    render json: {
      choiceList: Choice.where(theme_id: params[:themeId])
    }
  end

  def random
  end

  def new
    ChoiceDomain::Entity.new.create(choice_params(params))
    render json: {}
  end

  def update
  end

  def destroy
    ChoiceDomain::Entity.new.destroy(choice_params(params))
    render json: {}
  end

  private

  def choice_params(params)
    params.permit(:id, :name, :url, :evaluation, :description, :themeId)
  end
end
