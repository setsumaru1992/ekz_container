class DebugController < ApplicationController
  def debug
    render json: {status: "success"}
  end
end