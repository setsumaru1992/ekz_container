module Bussiness::Choice
  class Repository < Bussiness::Base::Repository
    class << self
      def find(id)
        choice_record = ::Choice.find(id)
        return if choice_record.blank?

        choice = set_same_name_fields(choice_record, Choice.new, [:id, :name, :url, :description, :evaluation, :theme_id])
        choice
      end

      def add(choice)
        new_choice_record = set_same_name_fields(choice, ::Choice.new, [:name, :url, :description, :evaluation, :theme_id])
        new_choice_record.save!

        choice.id = new_choice_record.id
        choice
      end

      def update(updated_choice)
        choice_record = ::Choice.find(updated_choice.id)
        choice_record = set_same_name_fields(updated_choice, choice_record, [:name, :url, :description, :evaluation, :theme_id])
        choice_record.save!
      end

      def remove(id)
        choice_record = ::Choice.find(id)
        choice_record.destroy!
      end
    end
  end
end
