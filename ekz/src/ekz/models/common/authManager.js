import cookieManager from "~/models/common/cookieManager"

const COOKIE_ACCESS_KEY_NAME = "ak"
const minute = 60
const hour = 60 * minute
const day = 24 * hour
const COOKIE_ACCESS_KEY_ATTR = {
  maxAge: 1 * hour,
}

class AuthManager {

  getAccessKey(){
    return cookieManager.get(COOKIE_ACCESS_KEY_NAME)
  }

  setAccessKey(accessKey){
    cookieManager.set(COOKIE_ACCESS_KEY_NAME, accessKey, COOKIE_ACCESS_KEY_ATTR)
  }

  deleteAccessKey(){
    cookieManager.delete(COOKIE_ACCESS_KEY_NAME)
  }
}
const authManager = new AuthManager() // シングルトン化
export default authManager