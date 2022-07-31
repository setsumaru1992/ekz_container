module Application::Finder
  class ThemeFinder < Bussiness::Base::Finder
    attribute :user_id, :integer
    validates :user_id, presence: true

    def fetch
      ::Theme
        .select("
          themes.id
          , themes.name
          , themes.description
          , (
          SELECT
            CASE
              WHEN MAX(choices.updated_at) > themes.updated_at THEN MAX(choices.updated_at)
              ELSE themes.updated_at
            END
            FROM themes as themes_of_subquery
              LEFT JOIN choices
                ON choices.theme_id = themes_of_subquery.id
            WHERE themes_of_subquery.id = themes.id
            GROUP BY themes_of_subquery.id
          ) AS last_updated
          ")
        .user_in(user_id)
        .order("last_updated DESC")
        .order("created_at DESC")
    end
  end
end