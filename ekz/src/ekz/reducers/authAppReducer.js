import AuthManager from "~/models/auth/authManager"
import {requestGetterWithoutParam} from "~/common/request"
import {patch} from "~/reducers/utils/stateUtils"
import authCookieManager from "~/models/auth/authCookieManager"
import {HTTP_METHODS} from '~/common/const'

export const ACTION_LOGIN = "ACTION_LOGIN"
export const ACTION_LOGOUT = "ACTION_LOGOUT"
export const ACTION_CHECK_NEED_LOGIN = "ACTION_CHECK_NEED_LOGIN"

const URL_BASE = "sessions/"
const REQUEST_GETTERS = {
  LOGIN: requestGetterWithoutParam(URL_BASE + "login", HTTP_METHODS.POST),
  LOGOUT: requestGetterWithoutParam(URL_BASE + "logout", HTTP_METHODS.DELETE),
  IS_ACCESS_TOKEN_VALID: requestGetterWithoutParam(URL_BASE + "is_valid", HTTP_METHODS.POST),
  IS_REMIND_TOKEN_VALID: requestGetterWithoutParam(URL_BASE + "is_valid_remind_token", HTTP_METHODS.POST),
}

export default function authAppReducer(state = new AuthManager, action) {
  console.log(state)
  switch (action.type) {
    case ACTION_LOGIN:
      return state.updateLoginResultState(action.isLoginSuccess, action.accessKey, action.remindToken)
    case ACTION_LOGOUT:
      return state.logout()
    case ACTION_CHECK_NEED_LOGIN:
      return state.updateNeedLoginState(action.needLogin, action.accessKey)
    default:
      return state
  }
}

function actionLogin(isLoginSuccess, accessKey, remindToken) {
  return {
    type: ACTION_LOGIN,
    isLoginSuccess,
    accessKey,
    remindToken,
  }
}

//export async function actionAsyncLogin(loginData) {
export function actionAsyncLogin(loginData) {
  return dispatch => { //const data = await REQUEST_GETTERS.LOGIN({
    REQUEST_GETTERS.LOGIN({
      email: loginData.email,
      password: loginData.password,
      autologin: loginData.autologin
    })
    //.send()
      .access(data => {
        dispatch(actionLogin(data.is_login_success, data.access_key, data.remind_token))
      })
    // return  {
    //   type: ACTION_LOGIN,
    //   needLogin,
    //   accessKey: data.access_key,
    //   remind_token: data.remind_token,
    // }
  }
}

function actionLogout() {
  return {
    type: ACTION_LOGOUT,
  }
}

export function actionAsyncLogout() {
  return (dispatch) => {
    return REQUEST_GETTERS.LOGOUT({access_key: authCookieManager.getAccessKey()}).access((data) => {
      dispatch(actionLogout())
    })
  }
}

function actionCheckNeedLogin(needLogin, accessKey = null) {
  return {
    type: ACTION_CHECK_NEED_LOGIN,
    needLogin,
    accessKey,
  }
}

export function actionAsyncCheckNeedLogin(accessKey) {
  return (dispatch) => {
    return REQUEST_GETTERS.IS_ACCESS_TOKEN_VALID({access_key: accessKey}).access((data) => {
      const needLogin = !data.is_valid

      if (needLogin === true && authCookieManager.getRemindToken() !== null) {
        dispatch(actionAsyncCheckNeedLoginWithRemindToken(authCookieManager.getRemindToken()))
        return
      }
      dispatch(actionCheckNeedLogin(needLogin))
    })
  }
}

function actionAsyncCheckNeedLoginWithRemindToken(remindToken) {
  return (dispatch) => {
    return REQUEST_GETTERS.IS_REMIND_TOKEN_VALID({remind_token: remindToken}).access((data) => {
      dispatch(actionCheckNeedLogin(data.access_key === null, data.access_key))
    })
  }
}