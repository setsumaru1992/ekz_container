import React from 'react';
import ReactDOM from 'react-dom';
import store from './ekz/common/store';
import App from './App';

ReactDOM.render(
  //<Provider store={store}>
    <App />
  //</Provider>
 ,
  document.getElementById('root')
);