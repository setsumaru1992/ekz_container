module Ekz::ThemeFactory
  class << self
    def create_by_theme_id(theme_id)
      Ekz::ThemeEntity.new(id: theme_id)
    end
  end
end