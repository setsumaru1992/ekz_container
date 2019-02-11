class ThemeEntity

  def initialize()

  end

  def create(params)
    theme = Theme.new
    theme.name = params[:name]
    theme.created_by = 1
    theme.updated_by = 1
    theme.save!
    return
  end
end