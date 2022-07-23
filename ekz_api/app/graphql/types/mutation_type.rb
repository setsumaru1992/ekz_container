module Types
  class MutationType < Types::BaseObject
    field :add_theme, mutation: Mutations::Theme::CreateTheme
    field :update_theme, mutation: Mutations::Theme::UpdateTheme
    field :delete_theme, mutation: Mutations::Theme::DeleteTheme

    field :delete_tag, resolver: Mutations::DeleteTag
    field :create_tag, resolver: Mutations::CreateTag
  end
end
