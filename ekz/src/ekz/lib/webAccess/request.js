import axios from "axios"

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE"
}

export class Url {
  constructor(urlStr, methodStr = HTTP_METHODS.GET) {
    this.url = urlStr
    this.methodStr = methodStr
  }

  to_s() {
    return this.url
  }
}

export class Request {
  constructor(axiosConfig) {
    this.axios = axios.create(axiosConfig)
  }

  /*
  react内でasyncが使えるのはredux内くらい redux-chunkを使った時点で非同期はそれに任せる
  https://kibotsu.com/redmine/issues/1853
   */
  async access(url /* Url型 */, params = {}, callback, defaultRetVal = null) {
    let execAccess = this.accessFunction(url.methodStr)
    const paramsForAxios = this.convertParamsForAxios(params, url.methodStr)
    return execAccess(url.to_s(), paramsForAxios)
      .then((response) => {
        const data = response.data
        let ret = callback(data)
        // resolve(ret)
        return ret
      }).catch((e) => {
          console.error(e)
          // reject(defaultRetVal)
          return defaultRetVal
        }
      )
  }

  sendDataWithFile(url /* Url型 */, params = {}, callback, errorHandle = null, defaultRetVal = null) {
    let execAccess = this.accessFunction(url.methodStr)
    const paramsForAxios = this.convertParamsForAxios(params, url.methodStr)
    return execAccess(url.to_s(), paramsForAxios, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then((response) => {
      const data = response.data
      let ret = callback(data)
      // resolve(ret)
      return ret
    }).catch((e) => {
      console.error(e)
      if(errorHandle != null){
        const {
          status,
          statusText
        } = e.response
        errorHandle(e, status, statusText)
      }
      // reject(defaultRetVal)
      return defaultRetVal
    })
  }

  /* private */

  accessFunction(methodStr) {
    switch (methodStr) {
      case HTTP_METHODS.GET:
        return this.axios.get
      case HTTP_METHODS.POST:
        return this.axios.post
      case HTTP_METHODS.DELETE:
        return this.axios.delete
      case HTTP_METHODS.PATCH:
        return this.axios.patch
      default:
        return null
    }
  }

  convertParamsForAxios(params, methodStr) {
    switch (methodStr) {
      case HTTP_METHODS.GET:
        return {
          params: params
        }
      case HTTP_METHODS.DELETE:
        return {
          data: params
        }
      default:
        return params
    }
  }
}