module Choices
  class TagsController < ApplicationController
    def index
      choice = Choice.find(tag_params[:choice_id])

      render json: {
        tags: choice.choice_tags
      }
    end

    def new
      # 暫定　あとでEntity化
      tag = Choice.find(tag_params[:choice_id]).choice_tags.build
      tag.name = tag_params[:name]
      tag.save!

      render json: {}
    end

    def destroy
      tag = Choice.find(tag_params[:choice_id])
              .choice_tags.find(tag_params[:id])
      tag.destroy
      render json: {}
    end

    private

    def tag_params
      params.permit(
        :id, :choice_id, :name
      )
    end
  end
end