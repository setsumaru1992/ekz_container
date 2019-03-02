import {requestGetterWithoutParam} from "~/common/request"
import {patch} from "~/reducers/utils/stateUtils"
import {HTTP_METHODS} from '~/common/const'

export const ACTION_LOGIN = "ACTION_LOGIN"

const URL_BASE = "sessions/"
const REQUEST_GETTERS = {
  LOGIN: requestGetterWithoutParam(URL_BASE + "login", HTTP_METHODS.POST),
}

const initialState = {
  isLoginSuccess: false
}

export default function sessionsAppReducer(state = initialState, action){
  switch (action.type) {
    case ACTION_LOGIN:
      return patch(state, {
        isLoginSuccess: action.isLoginSuccess
      })
    default:
      return state
  }
}

function actionLogin(isLoginSuccess){
  return  {
    type: ACTION_LOGIN,
    isLoginSuccess
  }
}

export function actionAsyncLogin(loginData){
  return (dispatch) =>{
    return REQUEST_GETTERS.LOGIN({email: loginData.email, password: loginData.password}).access((data) => {
      dispatch(actionLogin(data.isLoginSuccess))
    })
  }
}