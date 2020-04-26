import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import store from "~/common/store";
import App from "./App";
import ApolloClient, {gql} from 'apollo-boost';

const client = new ApolloClient({ uri: 'http://localhost:18071/graphql'})
const query = gql`
{ 
  testField
}
`

client.query({query})
  .then((data) => window.console.log('data', data))
  .catch(console.error)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);