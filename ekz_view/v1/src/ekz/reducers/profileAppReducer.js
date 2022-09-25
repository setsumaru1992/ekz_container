import ProfileManager from "~/models/profile/profileManager"
import {requestGetterWithoutParam} from "~/common/request"
import {HTTP_METHODS} from "~/common/const"
import authCookieManager from "../models/auth/authCookieManager";

export const ACTION_PROFILE = "ACTION_PROFILE"

const URL_BASE = "profiles/"
const REQUEST_GETTERS = {
  INDEX: requestGetterWithoutParam(URL_BASE, HTTP_METHODS.GET),
}

export default function profileAppReducer(state = new ProfileManager(), action) {
  switch (action.type) {
    case ACTION_PROFILE:
      return state.setDispNameAndEmail(action.dispName, action.email)
    default:
      return state
  }
}

function actionProfileIndex(dispName, email){
  return {
    type: ACTION_PROFILE,
    dispName,
    email,
  }
}

export function actionAsyncProfileIndex(){
  return dispatch => {
    return REQUEST_GETTERS.INDEX({access_key: authCookieManager.getAccessKey()}).access(data => {
      dispatch(actionProfileIndex(data.disp_name, data.email))
    })
  }
}