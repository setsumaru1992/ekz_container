module Bussiness::Theme
  class Repository < Bussiness::Base::Repository
    class << self
      def find(id)
        theme_record = ::Theme.find(id)
        return if theme_record.blank?

        theme = set_same_name_fields(theme_record, Theme.new, [:id, :name, :description])
        theme
      end

      def add(theme, user_id)
        new_theme_record = set_same_name_fields(theme, ::Theme.new, [:name, :description])
        new_theme_record.created_by = user_id
        new_theme_record.updated_by = user_id
        new_theme_record.save!

        theme.id = new_theme_record.id
        theme
      end

      def update(updated_theme, user_id)
        theme_record = ::Theme.find(updated_theme.id)
        theme_record = set_same_name_fields(updated_theme, theme_record, [:name, :description])
        theme_record.updated_by = user_id
        theme_record.save!
      end

      def remove(id)
        theme_record = ::Theme.find(id)
        theme_record.destroy!
      end
    end
  end
end