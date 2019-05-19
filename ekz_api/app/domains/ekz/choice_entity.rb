module Ekz
  class ChoiceEntity
    attr_reader :choice_model

    STATUS_NO_ERROR = 0
    STATUS_ERROR_THEME_NOT_EXIST = 1

    def initialize(params)
      id = params[:id]
      if id.blank?
        @choice_model = Choice.new
      else
        @choice_model = Choice.find_or_initialize_by(id: id)
      end
    end

    def save_new_model(params)
      result = initial_result
      @choice_model.theme = Theme.find(params[:theme_id])

      @choice_model.name = params[:name]
      @choice_model.url = params[:url]
      @choice_model.evaluation = params[:evaluation]
      @choice_model.description = params[:description]

      @choice_model.save!
      result
    end

    def update(params)
      result = initial_result
      if @choice_model.id.blank?
        result[:status] = STATUS_ERROR_THEME_NOT_EXIST
        return result
      end
      @choice_model.name = params[:name]
      @choice_model.url = params[:url]
      @choice_model.evaluation = params[:evaluation]
      @choice_model.description = params[:description]
      @choice_model.save!
      result
    end

    def update_model_evaluation(params)
      result = initial_result
      if @choice_model.id.blank?
        result[:status] = STATUS_ERROR_THEME_NOT_EXIST
        return result
      end
      @choice_model.evaluation = params[:evaluation]
      @choice_model.save!
      result
    end

    def destroy(params)
      result = initial_result
      @choice_model.destroy!
      result
    end

    private

    def initial_result
      {
        status: STATUS_NO_ERROR,
      }
    end
  end
end