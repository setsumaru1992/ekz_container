import ProfileManager from "~/models/profile/profileManager"
import {requestGetterWithoutParam} from "~/common/request"
import {HTTP_METHODS} from "~/common/const"
import authCookieManager from "../models/auth/authCookieManager";

export const ACTION_SIGNUP = "ACTION_SIGNUP"

const URL_BASE = "signup/"
const REQUEST_GETTERS = {
  REGIST: requestGetterWithoutParam(URL_BASE + "regist", HTTP_METHODS.POST),
}

export default function signupAppReducer(state = {}, action) {
  return state
}

function actionSignupRegist(){
  return {
    type: ACTION_SIGNUP,
  }
}

export function actionAsyncSignupRegist(newuser){
  return dispatch => {
    return REQUEST_GETTERS.REGIST(newuser).access(data => {
      dispatch(actionSignupRegist())
    })
  }
}