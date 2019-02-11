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
export default ax

export function req(
  url = "",
  params = {},
  callback = (data) => {},
  methodStr = HTTP_METHODS.GET,
  defaultRetVal = null
) {
  let access = getHttpMethod(methodStr)
  const paramsForAxios = getParamsForAxios(params, methodStr)
  // TODO PromiseにAsync/Await使用
  return new Promise((resolve, reject) => {
    access(url, paramsForAxios).then((response) => {
      const data = response.data
      let ret = callback(data)
      resolve(ret)
    })
      .catch((e) => {
        reject(defaultRetVal)
      })
  })
}

function getHttpMethod(methodStr) {
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