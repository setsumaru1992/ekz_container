import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import store from "~/common/store";
import App from "./App";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({ uri: 'http://localhost:18071/graphql'})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);