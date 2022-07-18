module Bussiness::Theme
  class Repository < Bussiness::Base::Repository
    class << self
      def add(theme, user_id)
        new_theme_record = set_same_name_fields_into_model(theme, ::Theme.new, [:name, :description])
        new_theme_record.created_by = user_id
        new_theme_record.updated_by = user_id
        new_theme_record.save!

        theme.id = new_theme_record.id
        theme
      end
    end
  end
end