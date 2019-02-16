import {requestGetterWithoutParam} from "~/common/request"
import {patch} from "~/reducers/utils/stateUtils"
import {HTTP_METHODS} from '~/common/const'

export const ACTION_THEME_LIST = "ACTION_THEME_LIST"
export const ACTION_THEME_CHANGED = "ACTION_THEME_CHANGED"

const URL_BASE = "themes/"
const REQUEST_GETTERS = {
  GET_ALL: requestGetterWithoutParam(URL_BASE + "show", HTTP_METHODS.GET),
  NEW: requestGetterWithoutParam(URL_BASE + "new", HTTP_METHODS.POST),
  DESTROY: requestGetterWithoutParam(URL_BASE + "destroy", HTTP_METHODS.DELETE),
}

const initialState = {
  themeList: [],
  theme: {},
}

function actionThemeList(themeList){
  return  {
    type: ACTION_THEME_LIST,
    themeList
  }
}

export function actionAsyncThemeList(){
  return (dispatch) =>{
    return REQUEST_GETTERS.GET_ALL({}).access((data) => {
      dispatch(actionThemeList(data.themeList))
    })
  }
}

export function actionThemeChanged(){
  return {
    type: ACTION_THEME_CHANGED,
  }
}

export function actionAsyncThemeNew(theme){
  return (dispatch) =>{
    return REQUEST_GETTERS.NEW(theme).access((data) => {
      dispatch(actionThemeChanged())
      dispatch(actionAsyncThemeList())
    })
  }
}

export function actionAsyncThemeDestroy(themeId){
  return (dispatch) =>{
    return REQUEST_GETTERS.DESTROY({id: themeId}).access((data) => {
      dispatch(actionThemeChanged())
      dispatch(actionAsyncThemeList())
    })
  }
}

export default function themesAppReducer(state = initialState, action){
  switch (action.type) {
    case ACTION_THEME_LIST:
      return patch(state, {
        themeList: action.themeList
      })
    case ACTION_THEME_CHANGED:
      return patch(state, {
        theme: action.theme
      })
    default:
      return state
  }
}