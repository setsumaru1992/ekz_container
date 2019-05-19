class ChoicesController < ApplicationController
  def show
    render json: {
      theme: Theme.find(choice_params[:theme_id]),
      choice_list: Choice.find_by_theme_id(choice_params[:theme_id]),
    }
  end

  def show_by_ids
    # TODO 構造化したデータを取得するには次のエラーメッセージをクリアしなきゃいけない気がする
    # Unpermitted parameter: :ids
    render json: {
      theme: Theme.find(choice_params[:theme_id]),
      choice_list: Choice.find_by_ids(choice_params[:ids]),
    }
  end

  def ekz
    theme_id = choice_params[:theme_id]
    render json: {
      theme: Theme.find(theme_id),
      ekz_list: Choice.ekz_pick(choice_params[:theme_id])
    }
  end

  def detail
    choice_entity = Ekz::ChoiceFactory.create_by_choice_id(choice_params[:id])
    render json: {choice: choice_entity.choice_model}
  end

  def new
    choice_entity = Ekz::ChoiceFactory.create_by_choice_id(choice_params[:id])
    result = choice_entity.save_new_model(choice_params)
    render json: {}
  end

  def update
    choice_entity = Ekz::ChoiceFactory.create_by_choice_id(choice_params[:id])
    choice_entity.update(choice_params)
    render json: {}
  end

  def update_evaluation
    choice_entity = Ekz::ChoiceFactory.create_by_choice_id(choice_params[:id])
    choice_entity.update_model_evaluation(choice_params)
    render json: {}
  end

  def destroy
    choice_entity = Ekz::ChoiceFactory.create_by_choice_id(choice_params[:id])
    choice_entity.destroy(choice_params)
    render json: {}
  end

  private

  def choice_params
    params.permit(
      :id, :name, :url, :evaluation, :description, :theme_id, :ids, :description
    )
  end
end
