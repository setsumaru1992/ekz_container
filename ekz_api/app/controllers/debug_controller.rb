class DebugController < ApplicationController
  def debug
    render json: {connection: "success"}
  end
end