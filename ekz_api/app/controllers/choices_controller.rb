class ChoicesController < ApplicationController
  def show
    render json: {
      theme: Theme.find(choice_params(params)[:theme_id]),
      choice_list: ChoiceDomain::Entity.new.list(choice_params(params))
    }
  end

  def ekz
    theme_id = choice_params(params)[:theme_id]
    render json: {
      theme: Theme.find(theme_id),
      ekz_list: ChoiceDomain::Entity.new.ekz_pick(choice_params(params))
    }
  end

  def new
    new_choice = ChoiceDomain::Entity.new.create(choice_params(params))
    render json: {
      choice: new_choice
    }
  end

  def update
    ChoiceDomain::Entity.new.update(choice_params(params))
    render json: {}
  end

  def destroy
    ChoiceDomain::Entity.new.destroy(choice_params(params))
    render json: {}
  end

  private

  def choice_params(params)
    params.permit(
      :id, :name, :url, :evaluation, :description, :theme_id
    )
  end
end
