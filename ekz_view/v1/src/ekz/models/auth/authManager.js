import {Record} from "immutable"
import authCookieManager from "~/models/auth/authCookieManager"
import {updateStateField} from "~/reducers/utils/stateUtils"

const AuthManagerRecord = Record({
  needLogin: false,
  loginFailed: false,
  accessKey: null,
  /*
  ユーザ情報は引き回さない。アクセスキーで復元できるから。
  マイページなど必要になった時にだけ使用する
   */
})

export default class AuthManager extends AuthManagerRecord {
  updateNeedLoginState(needLogin, accessKey = null){
    let updated = updateStateField(this, {needLogin: needLogin})
    updated = updated.setAccessKey(accessKey)
    return updated
  }

  updateLoginResultState(isLoginSuccess, accessKey = null, remindToken = null){
    let updated = this
    if(isLoginSuccess){
      updated = updated.loginSuccess(accessKey, remindToken)
    } else {
      updated = updated.loginFailed()
    }
    return updated
  }

  loginSuccess(accessKey, remindToken = null){
    let updated = updateStateField(this, {
      needLogin: false,
      loginFailed: false,
    })
    updated = updated.setAccessKey(accessKey)
    authCookieManager.setRemindToken(remindToken)
    return updated
  }

  setAccessKey(accessKey){
    let updated = updateStateField(this, {
      accessKey: accessKey,
    })
    authCookieManager.setAccessKey(accessKey)
    return updated
  }

  getAccessKey(){
    return authCookieManager.getAccessKey()
  }

  loginFailed(){
    let updated = updateStateField(this, {
      needLogin: true,
      loginFailed: true,
    })
    return updated
  }

  logout(){
    let updated = updateStateField(this, {
      needLogin: true,
      loginFailed: false,
      accessKey: null,
    })
    authCookieManager.deleteAccessKey()
    authCookieManager.deleteRemindToken()
    return updated
  }


}
