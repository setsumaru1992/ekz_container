class ApplicationController < ActionController::Base
  # require_relative "../domains/theme/theme"
  load Rails.root + "app/domains/theme/theme_entity.rb" # 暫定　themeドメインの更新が頻繁なときはrequireだと一回しか読んでくれないから
  load Rails.root + "app/domains/choice/choice_entity.rb" # 暫定　themeドメインの更新が頻繁なときはrequireだと一回しか読んでくれないから

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session # 暫定　CSTFキー作るまで
end
