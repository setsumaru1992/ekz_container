module Ekz
  class ThemeEntity
    STATUS_NO_ERROR = 0
    STATUS_ERROR_THEME_NOT_EXIST = 1

    def initialize(params)
      id = params[:id]
      if id.blank?
        @theme_model = Theme.new
      else
        @theme_model = Theme.find_or_initialize_by(id: id)
      end
    end

    def save_new_model(params, user_id)
      result = initial_result
      @theme_model.name = params[:name]
      @theme_model.created_by = user_id
      @theme_model.updated_by = user_id
      @theme_model.save!
      result
    end

    def update_model(params)
      result = initial_result
      if @theme_model.id.blank?
        result[:status] = STATUS_ERROR_THEME_NOT_EXIST
        return result
      end

      @theme_model.name = params[:name]
      @theme_model.updated_by = 1
      @theme_model.save!
      result
    end

    def destroy(params)
      result = initial_result
      @theme_model.destroy!
      result
    end

    private

    def initial_result
      {
        status: STATUS_NO_ERROR
      }
    end
  end
end