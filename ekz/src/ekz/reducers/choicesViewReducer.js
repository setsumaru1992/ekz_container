import {patch, updateObject} from "~/reducers/utils/stateUtils"

export const ACTION_CHOICE_VISIBLE_FORM = "ACTION_CHOICE_VISIBLE_FORM"
export const ACTION_CHOICE_VISIBLE_FILE_FORM = "ACTION_CHOICE_VISIBLE_FILE_FORM"

const initialState = {
  visibleFormMap: {},
  visibleFileFormMap: {},
}

export function actionChoiceVisibleForm(themeId, choiceId = ""){
  return  {
    type: ACTION_CHOICE_VISIBLE_FORM,
    themeId,
    choiceId,
  }
}

export function actionChoiceVisibleFileForm(choiceId, imageId = ""){
  return  {
    type: ACTION_CHOICE_VISIBLE_FILE_FORM,
    choiceId,
    imageId,
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
    case ACTION_CHOICE_VISIBLE_FILE_FORM:
      let newVisibleFileFormMap = {}
      const targetKeyOfFileForm = `${action.choiceId}_${action.imageId}`
      const currentBoolValOfFileForm = state.visibleFileFormMap[targetKeyOfFileForm]
      Object.keys(state.visibleFileFormMap).forEach((key) => {
        newVisibleFileFormMap[key] = false
      })
      newVisibleFileFormMap =  updateObject(
        newVisibleFileFormMap, targetKeyOfFileForm, !currentBoolValOfFileForm
      )
      return patch(state, {
        visibleFileFormMap: newVisibleFileFormMap
      })
    default:
      return state
  }
}