import ApolloClient from 'apollo-boost';

let protcol = null;
let host = null;
if(window.location.href.indexOf("localhost") > 0){
  protcol = 'http';
  host = 'localhost:18030';
} else {
  protcol = 'http';
  host = 'ekz.kibotsu.com';
}
const url = `${protcol}://${host}/api/v2/graphql`;

export default new ApolloClient({ uri: url})