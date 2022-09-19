module Application::Finder
  class ChoiceFinder < Bussiness::Base::Finder
    attribute :theme_id, :integer
    validates :theme_id, presence: true

    def fetch
      ::Choice.where(theme_id: theme_id).order("created_at DESC")
    end
  end
end