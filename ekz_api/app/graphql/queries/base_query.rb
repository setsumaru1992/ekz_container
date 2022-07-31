module Queries
  # TODO: ログイン時のみ、authorized?でログイン済みユーザを必要としないクラスを使用
  class BaseQuery < GraphQL::Schema::Resolver
    def authorized?() # (args) # argがないthemeクエリではエラー起きないけど、今度どうなるかわからない
      raise GraphQL::ExecutionError, 'login required!!' unless context[:current_user_id].present?

      true
    end
  end
end