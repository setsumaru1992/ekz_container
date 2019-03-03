import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import authManager from "~/models/common/authManager"
import {actionAsyncCheckNeedLogin} from "~/reducers/sessionsAppReducer"
import {initialStateOfRedirectToLogin} from '~/views/pages/sessions/login'

const LOGIN_PATH = "/login"

class AuthPageDispatcher extends Component {
  componentWillMount() {
    const {
      actionAsyncCheckNeedLogin,
    } = this.props
    actionAsyncCheckNeedLogin(authManager.getAccessKey())
  }

  render(){
    const {
      location,
      needLogin,
      children,
    } = this.props
    const currentPath = location.pathname
    let redirectComponent = needLogin && currentPath !== LOGIN_PATH
      ? <RidirectToLogin beforeLoginPath={currentPath}/>
      : ""
    return (
      <div>
        {redirectComponent}
        {children}
      </div>
    )
  }
}

AuthPageDispatcher.propTypes = {
  children: PropTypes.any,
}

class RidirectToLogin extends Component {
  render(){
    const {
      beforeLoginPath
    } = this.props
    let state = initialStateOfRedirectToLogin
    state["beforeLoginPath"] = beforeLoginPath
    return (
      <Redirect
        to={{
          pathname: LOGIN_PATH,
          state: state
        }}
      />
    )
  }
}

RidirectToLogin.propTypes = {
  beforeLoginPath: PropTypes.string,
}

export default connectViewToStateAndActionCreaters(AuthPageDispatcher,
  (state) => {
    return {
      needLogin: state.sessionsAppReducer.needLogin
    }
  }, {actionAsyncCheckNeedLogin}
)
