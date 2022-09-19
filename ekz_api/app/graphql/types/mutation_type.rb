module Types
  class MutationType < Types::BaseObject
    field :add_theme, mutation: Mutations::Theme::CreateTheme
    field :update_theme, mutation: Mutations::Theme::UpdateTheme
    field :remove_theme, mutation: Mutations::Theme::DeleteTheme

    field :add_choice, mutation: Mutations::Choice::CreateChoice
    field :update_choice, mutation: Mutations::Choice::UpdateChoice
    field :remove_choice, mutation: Mutations::Choice::DeleteChoice

    field :delete_tag, resolver: Mutations::DeleteTag
    field :create_tag, resolver: Mutations::CreateTag
  end
end
