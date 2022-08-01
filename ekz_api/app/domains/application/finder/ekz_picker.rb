module Application::Finder
  class EkzPicker < Bussiness::Base::Finder
    attribute :theme_id, :integer
    validates :theme_id, presence: true
    attribute :pre_picked_choice_id, :integer

    def fetch
      can_repick = Choice.where(theme_id: theme_id).where.not(id: pre_picked_choice_id).size > 0
      while true
        ekz_list = Choice.ekz_pick(theme_id)
        if ekz_list.first.id != pre_picked_choice_id || !can_repick
          break
        end
      end

      choice_ids = ekz_list.map(&:id)

      ekz_hash_list = choices_from_(choice_ids)

      ekz_hash_list.first
    end

    private

    def choices_from_(ids)
      choices = Choice.where(id: ids)

      # TODO: この取得方法が良いとは思っていないので、適宜update
      choices.map do |choice|
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
        
        choice_hash
      end
    end
  end
end
