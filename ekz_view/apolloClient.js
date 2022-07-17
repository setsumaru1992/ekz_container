import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import fetch from 'isomorphic-unfetch'
import judgeExecInClientOrServer, { ExecSituation } from "./src/lib/judgeExecInClientOrServer";

const generateUrl = () => {
  let protcol;
  let host;
  switch (judgeExecInClientOrServer){
    case ExecSituation.ExecInServerSide:
      protcol = 'http';
      host = 'ekz_api:18030';
    case ExecSituation.ExecInServerSide:
      protcol = 'http';
      host = 'localhost:18030';
    default:
      protcol = 'http';
      host = 'ekz.kibotsu.com';
  }
  return `${protcol}://${host}/api/v2/graphql`;
}

export const createApolloClient = (initialState, ctx) => {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: generateUrl(),
      // credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  })
}

export default createApolloClient()