module Types
  class MutationType < Types::BaseObject
    field :add_theme, mutation: Mutations::Theme::CreateTheme
    field :update_theme, mutation: Mutations::Theme::UpdateTheme
    field :remove_theme, mutation: Mutations::Theme::DeleteTheme

    field :add_choice, mutation: Mutations::Theme::CreateChoice

    field :delete_tag, resolver: Mutations::DeleteTag
    field :create_tag, resolver: Mutations::CreateTag
  end
end
