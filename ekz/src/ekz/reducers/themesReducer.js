import {req} from "~/common/axios"
import {patch} from "~/reducers/_utils/stateUtils"
import {HTTP_METHODS} from '~/common/const'

export const ACTION_THEME_LIST = "ACTION_THEME_LIST"
export const ACTION_THEME_NEW = "ACTION_THEME_NEW"

const URL_BASE = "themes/"
const URLS = {
  GET_ALL: URL_BASE + "show",
  NEW: URL_BASE + "new",
}

const initialState = {
  themeList: [],
  theme: {}
}

function actionThemeList(themeList){
  return  {
    type: ACTION_THEME_LIST,
    themeList
  }
}

export function actionAsyncThemeList(){
  return (dispatch) =>{
    return req(URLS.GET_ALL, {}, (data) => {
      dispatch(actionThemeList(data.themeList))
    })
  }
}

export function actionThemeNew(){
  return {
    type: ACTION_THEME_NEW,
    theme: {},
  }
}

export function actionAsyncThemeNew(theme){
  return (dispatch) =>{
    return req(URLS.NEW, theme, (data) => {
      dispatch(actionThemeNew())
      dispatch(actionAsyncThemeList())
    }, HTTP_METHODS.POST)
  }
}

export default function themesReducer(state = initialState, action){
  switch (action.type) {
    case ACTION_THEME_LIST:
      return patch(state, {
        themeList: action.themeList
      })
    case ACTION_THEME_NEW:
      return patch(state, {
        theme: action.theme
      })
    default:
      return state
  }
}