import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

export default function createApolloClient(initialState, ctx) {
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

const generateUrl = () => {
  let protcol = null;
  let host = null;
  if(typeof window == 'undefined'){
    protcol = 'http';
    host = 'ekz_api:18071';
  } else if (window.location.href.indexOf("localhost") > 0){
    protcol = 'http';
    host = 'localhost:18071';
  } else {
    protcol = 'https';
    host = 'ekz.jp';
  }
  return `${protcol}://${host}/api/v2/graphql`;
}
