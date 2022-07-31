module Types
  class BaseArgument < GraphQL::Schema::Argument
    # authorizedでない理由: https://qiita.com/Paul_Dirac/items/6eb819abce3640f1a701#authorized
    def ready?(**args)
      raise GraphQL::ExecutionError, 'login required!!' unless context[:current_user_id].present?

      true
    end
  end
end
