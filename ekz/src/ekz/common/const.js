let apiHost = ""
if(window.location.href.indexOf("localhost") > 0){
  apiHost = "http://localhost:18071/"
} else {
  apiHost = "https://ekz.jp/"
}
export const EKZ_API_ROOT = apiHost + "api/v1/"

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE"
}