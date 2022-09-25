import ApolloClient from "apollo-boost";

let protcol = null;
let host = null;
if (window.location.href.indexOf("localhost") > 0) {
  protcol = "http";
  host = process.env.NEXT_PUBLIC_API_HOST_AND_PORT_BY_CLIENT_SIDE_DEV;
} else {
  protcol = "http";
  host = process.env.NEXT_PUBLIC_API_HOST_AND_PORT_BY_CLIENT_SIDE_PROD;
}
const url = `${protcol}://${host}/api/v2/graphql`;

export default new ApolloClient({ uri: url });
