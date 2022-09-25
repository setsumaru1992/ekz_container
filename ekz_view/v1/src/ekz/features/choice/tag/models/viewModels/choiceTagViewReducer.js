import {patch, updateObject} from "~/reducers/utils/stateUtils"

const initialState = {
  visibleFormMap: {}
}

export default function choiceTagViewReducer(state = initialState, action){
  switch (action.type) {
    case ACTION_TOGGLE_FORM_VISIBLE:
      let newVisibleFormMap = {}
      let targetKey = `${action.choiceId}_`
      if(action.tagId != undefined && action.tagId != null) targetKey += action.tagId
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

const ACTION_TOGGLE_FORM_VISIBLE = "ACTION_TOGGLE_FORM_VISIBLE"

export function toggleFormVisible(choiceId, tagId = null){
  return {
    type: ACTION_TOGGLE_FORM_VISIBLE,
    choiceId,
    tagId
  }
}