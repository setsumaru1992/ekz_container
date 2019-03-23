import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Layout from "~/views/layouts"
import ThemeShow from '~/views/pages/themes/show'
import ChoiceShow from '~/views/pages/choices/show'
import Login from '~/views/pages/sessions/login'
import Logout from '~/views/pages/sessions/logout'
import Dev from '~/views/pages/develop'
import AuthPageDispatcher from '~/views/components/sessions/authPageDispatcher'

class App extends Component {
  render() {
    const MypageRoute = (props) =>(
      <Route exact path={props.path} render={() =>(
        <AuthPageDispatcher>
          <props.componentClass/>
        </AuthPageDispatcher>
      )}/>
    )
    MypageRoute.propTypes = {
      path: PropTypes.string,
      componentClass: PropTypes.any,
    }
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/debug" component={Dev} />
            {/* session */}
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            {/* mypage */}
            <MypageRoute path="/mypage/theme" componentClass={ThemeShow} />
            <MypageRoute path="/mypage/choice" componentClass={ChoiceShow} />
            <MypageRoute path="/mypage/profile" componentClass={Profile} />

            {/* signup */}
            <Route path="/signup" component={Signup} />

            <MypageRoute path="/" componentClass={ThemeShow} />


            {/* public */}
          </Switch>
        </Layout>
      </Router>
    );
  }
}


// const Top = () => (
//   <div>
//     <h2>Top</h2>
//     <p>ログイン</p>
//     <p>新規登録</p>
//   </div>
// );

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
