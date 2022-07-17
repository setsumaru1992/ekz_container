let apiHost = "";
if (window.location.href.indexOf("localhost") > 0) {
  apiHost = `http://${process.env.NEXT_PUBLIC_API_HOST_AND_PORT_BY_CLIENT_SIDE_DEV}`;
} else {
  apiHost = `http://${process.env.NEXT_PUBLIC_API_HOST_AND_PORT_BY_CLIENT_SIDE_PROD}`;
}
export const EKZ_API_ROOT = apiHost + "/api/v1/";

export const EKZ_IMAGE_ROOT = apiHost;

export const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  DELETE: "delete",
};
