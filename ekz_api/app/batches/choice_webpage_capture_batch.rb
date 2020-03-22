class ChoiceWebpageCaptureBatch
  class << self
    def exec
      Ekz::ChoiceEntity.existing_entities do |choice|
        choice.regist_webpage_capture
      end
    end
  end
end