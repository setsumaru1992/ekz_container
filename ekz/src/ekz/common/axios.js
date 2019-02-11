import axios from 'axios'
import {URLS, HTTP_METHODS, EKZ_API_ROOT} from '~/common/const'

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

// TODO パラメータ付きに変更 json形式（初期値＝{}）
// https://qiita.com/taroc/items/f22f7dd5d6d5443c72a4
export function req(
  url = "",
  params = {},
  callback = (data) => {},
  methodStr = HTTP_METHODS.GET,
  defaultRetVal = null
) {
  let access = getHttpMethod(methodStr)
  // TODO PromiseにAsync/Await使用
  return new Promise((resolve, reject) => {
    access(url, params).then((response) => {
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
  }
}