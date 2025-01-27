import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import fetch from 'isomorphic-unfetch';
import judgeExecInClientOrServer, {
  ExecSituation,
} from '../lib/judgeExecInClientOrServer';
import authCookieManager from '../features/auth/authCookieManager';
import { apiErrors } from './globalVars';

const generateUrl = () => {
  let protcol;
  let host;
  switch (judgeExecInClientOrServer) {
    case ExecSituation.ExecInServerSide:
      protcol = 'http';
      host = process.env.API_HOST_AND_PORT_BY_SERVER_SIDE;
      break;
    case ExecSituation.ExecInClientSide:
      if (process.env.NODE_ENV === 'development') {
        protcol = 'http';
        host = process.env.NEXT_PUBLIC_API_HOST_AND_PORT_BY_CLIENT_SIDE_DEV;
      } else {
        protcol = 'https';
        host = process.env.NEXT_PUBLIC_API_HOST_AND_PORT_BY_CLIENT_SIDE_PROD;
      }
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

const generateLink = (ctx) => {
  const accessKey = getAccessKey(ctx);
  const httpLink = new HttpLink({
    uri: generateUrl(),
    // credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch,
    headers: { Authorization: accessKey || '' },
  });

  const errorLink = onError(({ graphQLErrors }) => {
    const errors = [];
    if (graphQLErrors) {
      graphQLErrors.forEach((err) => {
        errors.push(err);
      });
    }
    apiErrors(errors);
  });

  return from([errorLink, httpLink]);
};

// The `ctx` (NextPageContext) will only be present on the server.
// use it to extract auth headers (ctx.req) or similar.
export default (ctx) => {
  return new ApolloClient({
    link: generateLink(ctx),
    cache: new InMemoryCache(),
  });
};
