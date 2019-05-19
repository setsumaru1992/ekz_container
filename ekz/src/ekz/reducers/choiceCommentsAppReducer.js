import {requestGetterWithoutParam} from "~/common/request"
import {HTTP_METHODS} from "~/common/const"
import ChoiceCommentState from "~/models/choice/choiceCommentState"

export const ACTION_CHOICE_COMMENTS = "ACTION_CHOICE_COMMENTS"
export const ACTION_CHOICE_COMMENT_NEW = "ACTION_CHOICE_COMMENT_NEW"
export const ACTION_CHOICE_COMMENT_UPDATE = "ACTION_CHOICE_COMMENT_UPDATE"
export const ACTION_CHOICE_COMMENT_DESTROY = "ACTION_CHOICE_COMMENT_DESTROY"

const URL_BASE = "choice_comments/"
const REQUEST_GETTERS = {
  COMMENTS: requestGetterWithoutParam(URL_BASE + "show", HTTP_METHODS.GET),
  NEW: requestGetterWithoutParam(URL_BASE + "new", HTTP_METHODS.POST),
  UPDATE: requestGetterWithoutParam(URL_BASE + "update", HTTP_METHODS.PATCH),
  DESTROY: requestGetterWithoutParam(URL_BASE + "delete", HTTP_METHODS.DELETE),
}

export default function choiceCommentsAppReducer(state = new ChoiceCommentState(), action){
  let updatedState = state
  switch (action.type) {
    case ACTION_CHOICE_COMMENTS:
      return updatedState.setComments(action.choiceId, action.comments)
    case ACTION_CHOICE_COMMENT_NEW:
      return updatedState.addComment(action.choiceId, action.comment)
    case ACTION_CHOICE_COMMENT_UPDATE:
      return state
    case ACTION_CHOICE_COMMENT_DESTROY:
      return state
    default:
      return state
  }
}

function actionChoiceComments(choiceId, comments){
  return  {
    type: ACTION_CHOICE_COMMENTS,
    choiceId,
    comments,
  }
}

export function actionAsyncChoiceComments(choiceId){
  return (dispatch) =>{
    return REQUEST_GETTERS.COMMENTS({choice_id: choiceId}).access((data) => {
      dispatch(actionChoiceComments(choiceId, data.comments))
    })
  }
}

function actionChoiceCommentNew(choiceId, comment){
  return  {
    type: ACTION_CHOICE_COMMENT_NEW,
    choiceId,
    comment,
  }
}

export function actionAsyncChoiceCommentNew(commentForm){
  return (dispatch) =>{
    return REQUEST_GETTERS.NEW(commentForm).access((data) => {
      dispatch(actionChoiceComments(commentForm.choice_id, data.comment))
    })
  }
}

