class ChoicesController < ApplicationController
  def show
    choice_list = Choice.find_by_theme_id(choice_params[:theme_id]).limit(100)
    if choice_params[:search_word].present?
      search_word = choice_params[:search_word]
      choice_list = choice_list.where(
          %Q(name LIKE '%#{search_word}%'
          OR EXISTS(
              SELECT *
              FROM choice_tags ct
              WHERE ct.choice_id = choices.id
                AND  ct.name LIKE '%#{search_word}%'
            )
          )
        )
    end
    choice_hash_list = choice_list.map do |choice|
      choice_hash = choice.attributes
      choice_hash["image_filename"] = choice.choice_images.last.image_filename if choice.choice_images.present?
      if choice.choice_webpage_capture.present?
        begin
          choice_hash["webpage_capture"] = choice.choice_webpage_capture.image.url
        rescue => e
          Rails.logger.error(e.message)
          Rails.logger.error(e.backtrace.join("\n"))
        end
      end
      choice_hash
    end
    render json: {
      theme: Theme.find(choice_params[:theme_id]),
      choice_list: choice_hash_list,
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
    ekz_list = Choice.ekz_pick(choice_params[:theme_id])
    ekz_hash_list = ekz_list.map do |choice|
      choice_hash = choice.attributes
      choice_hash["image_filename"] = choice.choice_images.first.image_filename if choice.choice_images.present?
      if choice.choice_webpage_capture.present?
        begin
          choice_hash["webpage_capture"] = choice.choice_webpage_capture.image.url
        rescue => e
          Rails.logger.error(e.message)
          Rails.logger.error(e.backtrace.join("\n"))
        end
      end
      Rails.logger.info(choice_hash)
      choice_hash
    end
    render json: {
      theme: Theme.find(theme_id),
      ekz_list: ekz_hash_list
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
      :id, :name, :url, :evaluation, :description, :theme_id, :ids, :search_word,
      :description, :choice, :image
    )
  end
end
