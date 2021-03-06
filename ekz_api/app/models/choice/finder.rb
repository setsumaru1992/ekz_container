module Choice::Finder
  extend ActiveSupport::Concern
  include Choice::EkzPicker

  class_methods do
    def find_by_theme_id(theme_id)
      Choice.where(theme_id: theme_id).eager_load(:choice_images).eager_load(:choice_webpage_capture)
        .select("choices.*, choice_images.image_filename, choice_images.id, choice_webpage_captures.image")
        .order("evaluation DESC").order("choices.updated_at DESC").order("choice_images.id DESC")
    end

    def find_by_ids(choice_ids)
      Choice.where(id: choice_ids)
        .order("evaluation DESC").order("updated_at DESC")
    end
  end
end