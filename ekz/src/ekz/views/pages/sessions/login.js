import React, {Component} from "react";
import {Redirect} from "react-router-dom"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncLogin} from "~/reducers/authAppReducer"
import {REQUEST_GETTERS} from "~/models/auth/authManager"
import LoginForm from "~/views/components/sessions/loginForm"

class Login extends Component {
  render() {
    const {
      actionAsyncLogin,
      needLogin,
      location,
      loginFailed,
    } = this.props
    const beforeLoginState = location.state !== undefined
      ? location.state : initialStateOfRedirectToLogin
    return (
      <div>
        {needLogin
          ? ""
          : <Redirect to={{
            pathname: beforeLoginState["beforeLoginPath"],
            search: beforeLoginState["queryString"],
            state: initialStateOfRedirectToLogin
          }}/>}
        {loginFailed
          ? "メールアドレスかパスワードが誤っています。"
          : ""}
        <LoginForm
          onSubmit={actionAsyncLogin}
          initialValues={{
            email: "",
            password: "",
            autologin: false,
          }}
        />
      </div>
    )
  }
}

export let initialStateOfRedirectToLogin = {
  beforeLoginPath: "/",
  queryString: "",
}

Login.propTypes = {}

export default connectViewToStateAndActionCreaters(Login,
  (state) => {
    return {
      needLogin: state.authManager.get("needLogin"),
      accessKey: state.authManager.get("accessKey"),
      loginFailed: state.authManager.get("loginFailed"),
    }
  }, {actionAsyncLogin}
)
