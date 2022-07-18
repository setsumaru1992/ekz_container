module Types
  class MutationType < Types::BaseObject
    field :create_theme, resolver: Mutations::Theme::CreateTheme
    field :update_theme, resolver: Mutations::Theme::UpdateTheme
    field :delete_theme, resolver: Mutations::Theme::DeleteTheme

    field :delete_tag, resolver: Mutations::DeleteTag
    field :create_tag, resolver: Mutations::CreateTag
  end
end
