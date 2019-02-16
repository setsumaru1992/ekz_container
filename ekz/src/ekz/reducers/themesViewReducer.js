import {requestGetterWithoutParam} from "~/common/request"
import {patch} from "~/reducers/utils/stateUtils"
import {HTTP_METHODS} from '~/common/const'

export const ACTION_THEME_VISIBLE_THEME_NEW = "ACTION_THEME_VISIBLE_THEME_NEW"

const initialState = {
  visibleThemeNew: false
}

export function actionVisibleThemeNew(){
  return  {
    type: ACTION_THEME_VISIBLE_THEME_NEW,
  }
}

export default function themesAppReducer(state = initialState, action){
  switch (action.type) {
    case ACTION_THEME_VISIBLE_THEME_NEW:
      return patch(state, {
        visibleThemeNew: !state.visibleThemeNew
      })
    default:
      return state
  }
}