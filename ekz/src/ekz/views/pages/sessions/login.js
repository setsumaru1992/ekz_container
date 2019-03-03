import React, {Component} from "react";
import { Redirect } from "react-router-dom"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncLogin} from "~/reducers/sessionsAppReducer"
import LoginForm from "~/views/components/sessions/loginForm"

class Login extends Component {
  render() {
    const {
      actionAsyncLogin,
      needLogin,
      location,
    } = this.props
    const beforeLoginState = location.state !== undefined
      ? location.state : initialStateOfRedirectToLogin
    const beforeLoginPath = beforeLoginState["beforeLoginPath"]
    return (
      <div>
        {needLogin
          ? ""
          : <Redirect to={{
            pathname: beforeLoginPath,
            state: initialStateOfRedirectToLogin
          }}/>}
        <LoginForm
          onSubmit={actionAsyncLogin}
          initialValues={{
            email: "",
            password: "",
          }}
        />
      </div>
    )
  }
}

export let initialStateOfRedirectToLogin = {
  beforeLoginPath: "/",
}

Login.propTypes = {
}

export default connectViewToStateAndActionCreaters(Login,
  (state) => {
    return {
      needLogin: state.sessionsAppReducer.needLogin,
      accessKey: state.sessionsAppReducer.accessKey,
    }
  }, {actionAsyncLogin}
)
