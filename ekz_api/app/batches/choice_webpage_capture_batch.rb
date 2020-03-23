class ChoiceWebpageCaptureBatch
  class << self
    def exec
      Ekz::ChoiceEntity.existing_entities do |choice|
        begin
          choice.regist_webpage_capture
        rescue => e
          Rails.logger.error(e.message)
          Rails.logger.error(e.backtrace.join("\n"))
        end
      end
    end
  end
end
