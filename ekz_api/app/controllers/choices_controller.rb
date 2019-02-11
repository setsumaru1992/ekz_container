class ChoicesController < ApplicationController
  def show
    render json: {
      choiceList: Choice.where(theme_id: 1)
    }
  end

  def random
  end

  def new
  end

  def update
  end

  def destroy
  end
end
