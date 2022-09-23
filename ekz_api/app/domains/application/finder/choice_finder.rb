module Application::Finder
  class ChoiceFinder < Bussiness::Base::Finder
    attribute :theme_id, :integer
    validates :theme_id, presence: true

    def fetch
      choices = ::Choice
        .where(theme_id: theme_id)
        .eager_load_images
        .order("choices.created_at DESC")

      choices.map do |choice|
        result_choice = choice.attributes
        result_choice["image_url"] = choice.image_url

        result_choice
      end
    end
  end
end