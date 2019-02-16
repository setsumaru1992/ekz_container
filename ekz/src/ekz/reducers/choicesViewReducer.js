import {requestGetterWithoutParam} from "~/common/request"
import {patch, updateObject, toggleObjValue} from "~/reducers/utils/stateUtils"
import {HTTP_METHODS} from '~/common/const'

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
      return patch(state, {
        visibleFormMap: toggleObjValue(
          state.visibleFormMap, `${action.themeId}_${action.choiceId}`
        )
      })
    default:
      return state
  }
}