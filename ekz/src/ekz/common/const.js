let apiHost = ""
if(window.location.href.indexOf("localhost") > 0){
  apiHost = "http://localhost:18071"
} else {
  apiHost = "https://ekz.jp"
}
export const EKZ_API_ROOT = apiHost + "/api/v1/"

export const EKZ_IMAGE_ROOT = apiHost

export const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  DELETE: "delete"
}