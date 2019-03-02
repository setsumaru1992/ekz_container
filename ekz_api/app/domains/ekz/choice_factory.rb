module Ekz::ChoiceFactory
  class << self
    def create_by_choice_id(choice_id)
      Ekz::ChoiceEntity.new(id: choice_id)
    end
  end
end