import {patch, updateObject} from "~/reducers/utils/stateUtils"

export const ACTION_CHOICE_VISIBLE_FORM = "ACTION_CHOICE_VISIBLE_FORM"

const initialState = {
  visibleFormMap: {},
}

export function actionChoiceVisibleForm(themeId, choiceId = ""){
  return  {
    type: ACTION_CHOICE_VISIBLE_FORM,
    themeId,
    choiceId,
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
    default:
      return state
  }
}