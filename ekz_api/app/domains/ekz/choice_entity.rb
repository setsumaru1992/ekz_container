module Ekz
  class ChoiceEntity
    # TODO こんなデメテルの法則違反のやつ削除
    attr_reader :choice_model

    attr_reader :id
    attr_accessor :name, :url, :evaluation, :desctiption

    STATUS_NO_ERROR = 0
    STATUS_ERROR_CHOICE_NOT_EXIST = 1

    DB_ATTRIBUTES = {
        choice: %i(id name url evaluation desctiption).each_with_object({}) {|col, attrs| attrs[col] = col}
    }
    ATTRIBUTES = DB_ATTRIBUTES.map do|table, db_attrs|
      db_attrs.map {|table_col, attr_name| attr_name}
    end.flatten

    class << self
      def existing_entities(&brock)
        Choice.all.ids.map do |id|
          entity = self.new(id: id)
          if block_given?
            yield entity
            nil
          else
            entity
          end
        end
      end
    end

    def initialize(params)
      if params[:id].blank?
        @choice_model = Choice.new
      else
        @choice_model = Choice.find_or_initialize_by(id: params[:id])
        DB_ATTRIBUTES[:choice].each do |table_col, attr_name|
          set_field_value(attr_name, @choice_model[table_col])
        end
      end

      params.each do |key, value|
        next if value.blank?
        next unless ATTRIBUTES.include?(key)
        set_field_value(key, value)
      end
    end

    # TODO paramsを受け取るのではなく、Entity自身を更新させてこのメソッドではActiveRecordに値を移し替えて保存するのみ
    def save_new_model(params)
      result = initial_result
      @choice_model.theme = Theme.find(params[:theme_id])

      @choice_model.name = params[:name]
      @choice_model.url = params[:url]
      @choice_model.evaluation = params[:evaluation]
      @choice_model.description = params[:description]
      @choice_model.save!

      regist_webpage_capture

      return result if params[:image].blank?

      image_model = @choice_model.choice_images.build
      image_model.image_filename = params[:image]
      image_model.save!

      result
    end

    def update(params)
      result = initial_result
      if @choice_model.id.blank?
        result[:status] = STATUS_ERROR_CHOICE_NOT_EXIST
        return result
      end
      @choice_model.name = params[:name]
      @choice_model.url = params[:url]
      @choice_model.evaluation = params[:evaluation]
      @choice_model.description = params[:description]
      @choice_model.save!

      return result if params[:image].blank?

      image_model = @choice_model.choice_images.build
      image_model.image_filename = params[:image]
      image_model.save!

      result
    end

    def regist_webpage_capture
      return if @url.blank?

      choice_webpage_capture = @choice_model.choice_webpage_capture.presence || @choice_model.build_choice_webpage_capture
      WebAccessor::FirstviewCapturer.new.exec(@url) do |screenshot|
        choice_webpage_capture.image = screenshot
      end
      choice_webpage_capture.save
    end

    def update_model_evaluation(params)
      result = initial_result
      if @choice_model.id.blank?
        result[:status] = STATUS_ERROR_CHOICE_NOT_EXIST
        return result
      end
      @choice_model.evaluation = params[:evaluation]
      @choice_model.save!
      result
    end

    def destroy(params)
      result = initial_result
      if @choice_model.choice_webpage_capture.present?
        @choice_model.choice_webpage_capture.destroy!
      end

      if @choice_model.choice_images.present?
        @choice_model.choice_images.destroy_all
      end

      @choice_model.destroy!
      result
    end

    private

    def initial_result
      {
        status: STATUS_NO_ERROR,
      }
    end

    def id=(id)
      @id = id.try(:to_i)
    end

    def set_field_value(field_name, value)
      method_name = field_name.to_s + "="
      public_send(method_name, value) if respond_to?(method_name)
    end

  end
end