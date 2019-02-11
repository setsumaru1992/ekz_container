class ThemesController < ApplicationController
  # require_relative "../domains/theme/theme"
  load Rails.root + "app/domains/theme/theme_entity.rb" # 暫定　themeドメインの更新が頻繁なときはrequireだと一回しか読んでくれないから

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session # 暫定　CSTFキー作るまで

  def index
  end

  def show
    render json: {
      themeList: Theme.all #.where(theme_id: 1)
    }
  end

  def new
    ThemeEntity.new.create(params)
    render json: {}
  end

  def update
  end

  def destroy
  end
end
