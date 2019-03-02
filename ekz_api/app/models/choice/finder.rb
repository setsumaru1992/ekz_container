module Choice::Finder
  extend ActiveSupport::Concern
  include Choice::EkzPicker

  class_methods do
    def find_by_theme_id(theme_id)
      Choice.where(theme_id: theme_id)
        .order("evaluation DESC").order("updated_at DESC")
    end

    def find_by_ids(choice_ids)
      Choice.where(id: choice_ids)
        .order("evaluation DESC").order("updated_at DESC")
    end
  end
end