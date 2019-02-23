import {patch, toggleObjValue} from "~/reducers/utils/stateUtils"

export const ACTION_THEME_VISIBLE_THEME_NEW = "ACTION_THEME_VISIBLE_THEME_NEW"
export const ACTION_THEME_VISIBLE_EDIT = "ACTION_THEME_VISIBLE_EDIT"

const initialState = {
  visibleThemeNew: false,
  visibleFormMap: {},
}

export default function themesAppReducer(state = initialState, action){
  switch (action.type) {
    case ACTION_THEME_VISIBLE_THEME_NEW:
      return patch(state, {
        visibleThemeNew: !state.visibleThemeNew
      })
    case ACTION_THEME_VISIBLE_EDIT:
      return patch(state, {
        visibleFormMap: toggleObjValue(
          state.visibleFormMap, `${action.themeId}`
        )
      })
    default:
      return state
  }
}

export function actionVisibleThemeNew(){
  return  {
    type: ACTION_THEME_VISIBLE_THEME_NEW,
  }
}

export function actionThemeVisibleForm(themeId){
  return  {
    type: ACTION_THEME_VISIBLE_EDIT,
    themeId,
  }
}