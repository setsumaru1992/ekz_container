import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import judgeExecInClientOrServer, {
  ExecSituation,
} from '../lib/judgeExecInClientOrServer';
import authCookieManager from '../features/auth/authCookieManager';

const generateUrl = () => {
  let protcol;
  let host;
  switch (judgeExecInClientOrServer) {
    case ExecSituation.ExecInServerSide:
      protcol = 'http';
      host = process.env.API_HOST_AND_PORT_BY_SERVER_SIDE;
      break;
    case ExecSituation.ExecInClientSide:
      protcol = 'http';
      host = process.env.NEXT_PUBLIC_API_HOST_AND_PORT_BY_CLIENT_SIDE_DEV;
      break;
    default:
      protcol = 'http';
      host = process.env.NEXT_PUBLIC_API_HOST_AND_PORT_BY_CLIENT_SIDE_PROD;
  }
  return `${protcol}://${host}/api/v2/graphql`;
};

const getAccessKey = (nextJsContext) => {
  switch (judgeExecInClientOrServer) {
    case ExecSituation.ExecInServerSide:
      return authCookieManager.getAccessKey(nextJsContext);
    case ExecSituation.ExecInClientSide:
      return authCookieManager.getAccessKey();
    default:
      return null;
  }
};

export default (ctx) => {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: generateUrl(),
      // credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
      headers: { Authorization: getAccessKey(ctx) || '' },
    }),
    cache: new InMemoryCache(),
  });
};
