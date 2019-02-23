module ThemeDomain
  class Entity

    def initialize()

    end

    def list(params)
      Theme
        .select("
themes.id
, themes.name
, themes.description
, (
SELECT MAX(choices.created_at)
FROM choices
WHERE theme_id = themes.id
GROUP BY theme_id
) AS last_updated
")
        .where(created_by: 1, accesible_group: nil)
        .order("last_updated DESC, created_at DESC")
    end

    def create(params)
      theme = Theme.new
      theme.name = params[:name]
      theme.created_by = 1
      theme.updated_by = 1
      theme.save!
      return
    end

    def destroy(params)
      theme = Theme.find(params[:id])
      theme.destroy
    end
  end
end