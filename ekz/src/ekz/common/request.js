import axios from 'axios'
import {HTTP_METHODS, EKZ_API_ROOT} from '~/common/const'

const axiosConfig = {
  baseURL: EKZ_API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json'
}

let ax = axios.create(axiosConfig)

export function requestGetterWithoutParam(url, methodStr) {
  return (params = {}) => {
    return new Request(url, params, methodStr)
  }
}

export class Request {
  constructor(url, params = {}, methodStr = HTTP_METHODS.GET){
    this.url = url
    this.params = params
    this.methodStr = methodStr
  }

  /*
  react内でasyncが使えるのはredux内くらい
  https://kibotsu.com/redmine/issues/1853
   */
  async access(callback, defaultRetVal = null){
    let access = getHttpAccesser(this.methodStr)
    const paramsForAxios = getParamsForAxios(this.params, this.methodStr)
    return access(this.url, paramsForAxios)
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
}

function getHttpAccesser(methodStr) {
  switch (methodStr) {
    case HTTP_METHODS.GET:
      return ax.get
    case HTTP_METHODS.POST:
      return ax.post
    case HTTP_METHODS.DELETE:
      return ax.delete
    case HTTP_METHODS.PATCH:
      return ax.patch
    default:
      return null
  }
}

function getParamsForAxios(params, methodStr){
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