import {requestGetterWithoutParam} from "~/common/request"
import {patch} from "~/reducers/utils/stateUtils"
import authManager from "~/models/common/authManager"
import {HTTP_METHODS} from '~/common/const'

export const ACTION_LOGIN = "ACTION_LOGIN"
export const ACTION_LOGOUT = "ACTION_LOGOUT"
export const ACTION_CHECK_NEED_LOGIN = "ACTION_CHECK_NEED_LOGIN"

const URL_BASE = "sessions/"
const REQUEST_GETTERS = {
  LOGIN: requestGetterWithoutParam(URL_BASE + "login", HTTP_METHODS.POST),
  LOGOUT: requestGetterWithoutParam(URL_BASE + "logout", HTTP_METHODS.DELETE),
  IS_ACCESS_TOKEN_VALID: requestGetterWithoutParam(URL_BASE + "is_valid", HTTP_METHODS.POST),
}

const initialState = {
  needLogin: false,
  accessKey: null,
  /*
  ユーザ情報は引き回さない。アクセスキーで復元できるから。
  マイページなど必要になった時にだけ使用する
   */
}

export default function sessionsAppReducer(state = initialState, action){
  switch (action.type) {
    case ACTION_LOGIN:
      authManager.setAccessKey(action.accessKey)
      return patch(state, {
        accessKey: action.accessKey,
        needLogin: action.needLogin,
      })
    case ACTION_LOGOUT:
      authManager.deleteAccessKey()
      return patch(initialState, {
        needLogin: true,
      })
    case ACTION_CHECK_NEED_LOGIN:
      return patch(state, {
        needLogin: action.needLogin,
      })
    default:
      return state
  }
}

function actionLogin(needLogin, accessKey){
  return  {
    type: ACTION_LOGIN,
    needLogin,
    accessKey,
  }
}

export function actionAsyncLogin(loginData){
  return (dispatch) =>{
    return REQUEST_GETTERS.LOGIN({email: loginData.email, password: loginData.password}).access((data) => {
      const needLogin = !data.is_login_success
      dispatch(actionLogin(needLogin, data.access_key))
    })
  }
}

function actionLogout(){
  return  {
    type: ACTION_LOGOUT,
  }
}

export function actionAsyncLogout(){
  return (dispatch) =>{
    return REQUEST_GETTERS.LOGOUT({access_key: authManager.getAccessKey()}).access((data) => {
      dispatch(actionLogout())
    })
  }
}

function actionCheckNeedLogin(needLogin){
  return  {
    type: ACTION_CHECK_NEED_LOGIN,
    needLogin,
  }
}

export function actionAsyncCheckNeedLogin(accessKey){
  return (dispatch) =>{
    return REQUEST_GETTERS.IS_ACCESS_TOKEN_VALID({access_key: accessKey}).access((data) => {
      const needLogin = !data.is_valid
      dispatch(actionCheckNeedLogin(needLogin))
    })
  }
}