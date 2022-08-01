module Bussiness::Choice
  class Repository < Bussiness::Base::Repository
    class << self
      def add(choice)
        new_choice_record = set_same_name_fields(choice, ::Choice.new, [:name, :url, :description, :evaluation, :theme_id])
        new_choice_record.save!

        choice.id = new_choice_record.id
        choice
      end
    end
  end
end
