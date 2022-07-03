// TODO: ライブラリを使ってこのファイルを破棄する
class CookieManager {
  get(key){
    if(this.cookieHashMap() == null) return null;
    let cookieVal = this.cookieHashMap()[key]
    if(cookieVal !== undefined && cookieVal != null){
      return decodeURIComponent(cookieVal)
    } else {
      return null
    }
  }

  set(key, value, attr: any={maxAge: undefined, expires: undefined, path: undefined, domain: undefined, secure: undefined}){
    let cookieStr = `${key}=${encodeURIComponent(value)};`
    const genKvWithEqualStr = (attrHash, attrKeyStr, cookieKey=null) => {
      cookieKey = cookieKey != null ? cookieKey : attrKeyStr
      const attrVal = attrHash[attrKeyStr]
      if(attrVal !== undefined){
        return `${cookieKey}=${encodeURIComponent(attrVal)};`
      } else {
        return ""
      }
    }
    // maxAgeとexpiresが両方定義されている場合以外にcookieにセット
    if (!(attr["maxAge"] !== undefined && attr["expires"] !== undefined)){
      cookieStr += genKvWithEqualStr(attr, "maxAge", "max-age")
      cookieStr += genKvWithEqualStr(attr, "expires")
    }
    cookieStr += genKvWithEqualStr(attr, "path")
    cookieStr += genKvWithEqualStr(attr, "domain")
    cookieStr += genKvWithEqualStr(attr, "secure")

    this.setCookie(cookieStr)
  }

  delete(key){
    this.set(key, "", {maxAge: 0})
  }

  cookie(){
    if(typeof window !== 'undefined'){
      return window.document.cookie
    } else {
      return null
    }
  }

  cookieHashMap(){
    if(this.cookie() == null) return null;
    let cookieHashMap = {}
    const cookieArray = this.cookie().split(";")
    cookieArray.forEach((cookieStr) => {
      const cookieKV = cookieStr.trim().split("=")
      const key = cookieKV[0]
      const value = cookieKV[1]
      cookieHashMap[key] = value
    })
    return cookieHashMap
  }

  setCookie(cookieStr){
    window.document.cookie = cookieStr
  }
}
const cookieManager = new CookieManager() // シングルトン化
export default cookieManager
