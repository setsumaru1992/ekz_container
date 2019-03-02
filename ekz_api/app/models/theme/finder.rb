module Theme::Finder
  extend ActiveSupport::Concern

  included  do
    scope :user_in, -> (user_id){where(created_by: user_id, accesible_group: nil)}
  end

  class_methods do
    def find_with_last_choice_updated(params)
      Theme
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
        .user_in(1)
        .order("last_updated DESC")
        .order("created_at DESC")
    end
  end
end