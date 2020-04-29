module Queries
  class Tags < BaseQuery
    type [Types::Choice::TagType], null: false

    def resolve(choice_id:)
      Choice.find(choice_id).choice_tags
    end
  end
end