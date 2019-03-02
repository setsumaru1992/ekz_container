import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import Layout from "~/views/layouts"
import ThemeShow from '~/views/pages/themes/show'
import ChoiceShow from '~/views/pages/choices/show'
import Login from '~/views/pages/sessions/login'

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exaxt exact path="/" component={Top} />
            {/* mypage */}
            <Route exaxt path="/mypage/theme" component={ThemeShow} />
            <Route exaxt path="/mypage/choice" component={ChoiceShow} />
            <Route exaxt path="/mypage/profile" component={Profile} />
            <Route exaxt path="/signup" component={Signup} />
            <Route exaxt path="/login" component={Login} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}


const Top = () => (
  <div>
    <h2>Top</h2>
    <p>ログイン</p>
    <p>新規登録</p>
    <Redirect to="/mypage/theme" />
  </div>
);

const MyPage = () => (
  <div>
    <h2>MyPage</h2>
  </div>
);

const Signup = () => (
  <div>
    <h2>Signup</h2>
  </div>
);

const Profile = () => (
  <div>
    <h2>Profile</h2>
  </div>
);

export default App;
