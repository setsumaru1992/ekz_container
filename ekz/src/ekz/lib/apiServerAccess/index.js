import {
  HTTP_METHODS,
  Request as GeneralRequest,
  Url as GeneralUrl,
} from "~/lib/webAccess";

let apiHost = "";
if (window.location.href.indexOf("localhost") > 0) {
  apiHost = `http://${process.env.NEXT_PUBLIC_API_HOST_AND_PORT_BY_CLIENT_SIDE_DEV}`;
} else {
  apiHost = `http://${process.env.NEXT_PUBLIC_API_HOST_AND_PORT_BY_CLIENT_SIDE_PROD}`;
}
const EKZ_API_ROOT = apiHost + "/api/v1";

const axiosConfigForApiServer = {
  baseURL: EKZ_API_ROOT,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
};

class Request extends GeneralRequest {
  constructor() {
    super(axiosConfigForApiServer);
  }
}

class Url extends GeneralUrl {
  constructor(path, methodStr = HTTP_METHODS.GET) {
    const urlStr = `${EKZ_API_ROOT}/${path}`;
    super(urlStr, methodStr);
  }
}

export { Request, HTTP_METHODS, Url };
