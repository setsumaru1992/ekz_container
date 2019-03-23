import {Record} from "immutable"
import authCookieManager from "~/models/auth/authCookieManager"

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
    let updated = this.updateField({needLogin: needLogin})
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
    let updated = this.updateField({
      needLogin: false,
      loginFailed: false,
    })
    updated = updated.setAccessKey(accessKey)
    authCookieManager.setRemindToken(remindToken)
    return updated
  }

  setAccessKey(accessKey){
    let updated = this.updateField({
      accessKey: accessKey,
    })
    authCookieManager.setAccessKey(accessKey)
    return updated
  }

  loginFailed(){
    let updated = this.updateField({
      needLogin: true,
      loginFailed: true,
    })
    return updated
  }

  logout(){
    let updated = this.updateField({
      needLogin: true,
      loginFailed: false,
      accessKey: null,
    })
    authCookieManager.deleteAccessKey()
    authCookieManager.deleteRemindToken()
    return updated
  }

  updateField(fieldValueMap){
    let updated = this
    Object.keys(fieldValueMap).forEach(fieldName => {
      updated = updated.set(fieldName, fieldValueMap[fieldName])
    });
    return updated
  }


}
