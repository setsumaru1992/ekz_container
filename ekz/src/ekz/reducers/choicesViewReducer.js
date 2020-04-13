import {patch, updateObject} from "~/reducers/utils/stateUtils"

export const ACTION_CHOICE_VISIBLE_FORM = "ACTION_CHOICE_VISIBLE_FORM"
export const ACTION_CHOICE_VISIBLE_COMMTNT_FORM = "ACTION_CHOICE_VISIBLE_COMMTNT_FORM"

const initialState = {
  visibleFormMap: {},
  visibleCommentFormMap: {},
}

export function actionChoiceVisibleForm(themeId, choiceId = ""){
  return  {
    type: ACTION_CHOICE_VISIBLE_FORM,
    themeId,
    choiceId,
  }
}

export function actionChoiceVisibleCommentForm(choiceId, commentId = ""){
  return  {
    type: ACTION_CHOICE_VISIBLE_COMMTNT_FORM,
    choiceId,
    commentId,
  }
}

export default function choicesAppReducer(state = initialState, action){
  switch (action.type) {
    case ACTION_CHOICE_VISIBLE_FORM:
      let newVisibleFormMap = {}
      const targetKey = `${action.themeId}_${action.choiceId}`
      const currentBoolVal = state.visibleFormMap[targetKey]
      Object.keys(state.visibleFormMap).forEach((key) => {
        newVisibleFormMap[key] = false
      })
      newVisibleFormMap =  updateObject(
        newVisibleFormMap, targetKey, !currentBoolVal
      )
      return patch(state, {
        visibleFormMap: newVisibleFormMap
      })
    case ACTION_CHOICE_VISIBLE_COMMTNT_FORM:
      let newVisibleCommentFormMap = {}
      const targetKeyOfCommentForm = `${action.choiceId}_${action.commentId}`
      const currentBoolValOfCommentForm = state.visibleCommentFormMap[targetKeyOfCommentForm]
      Object.keys(state.visibleCommentFormMap).forEach((key) => {
        newVisibleCommentFormMap[key] = false
      })
      newVisibleCommentFormMap =  updateObject(
        newVisibleCommentFormMap, targetKeyOfCommentForm, !currentBoolValOfCommentForm
      )
      return patch(state, {
        visibleCommentFormMap: newVisibleCommentFormMap
      })
    default:
      return state
  }
}