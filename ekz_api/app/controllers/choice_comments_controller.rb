class ChoiceCommentsController < ApplicationController
  def show
    choice = Choice.find(choice_comment_params[:choice_id])
    render json: {
      comments: choice.comments
    }
  end

  def new
    user_id = AuthManager.authenticate(choice_comment_params[:access_key])
    # 暫定　あとでEntity化
    comment_model = Choice.find(choice_comment_params[:choice_id]).comments.build
    comment_model.content = choice_comment_params[:comment]
    comment_model.created_by = user_id
    comment_model.save!

    render json: {
      comment: comment_model
    }
  end

  def update
  end

  def delete
  end

  private

  def choice_comment_params
    params.permit(
      :id, :comment, :access_key, :choice_id
    )
  end
end
