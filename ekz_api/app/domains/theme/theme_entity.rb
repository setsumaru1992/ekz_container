class ThemeEntity

  def initialize()

  end

  def create(params)
    theme = Theme.new
    theme.name = theme_params(params)[:name]
    theme.created_by = 1
    theme.updated_by = 1
    theme.save!
    return
  end

  private

  def theme_params(params)
    params.permit(:id, :name, :description)
  end
end