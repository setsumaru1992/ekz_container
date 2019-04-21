class AbstractMypageController < ApplicationController
  before_action :validate_access_key

  private

  def validate_access_key
    access_key = params[:access_key]
    @user_id = AuthManager.authenticate(access_key)
    render  status: 403, json: {} if @user_id.nil?
  end
end