import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import authManager from "~/models/common/authManager"
import {actionAsyncCheckNeedLogin} from "~/reducers/sessionsAppReducer"
import {initialStateOfRedirectToLogin} from '~/views/pages/sessions/login'

const LOGIN_PATH = "/login"
const LOGOUT_PATH = "/logout"

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
    const beforeLoginPath = new BeforeLoginPath(location)
    let redirectComponent = needLogin && !beforeLoginPath.isLoginPageNow
      ? <RidirectToLogin beforeLoginPath={beforeLoginPath.pathname} queryString={beforeLoginPath.queryString}/>
      : ""
    return (
      <div>
        {redirectComponent}
        {children}
      </div>
    )
  }
}

class BeforeLoginPath {
  constructor(routerLocation){
    this.pathname = initialStateOfRedirectToLogin["beforeLoginPath"]
    this.queryString = initialStateOfRedirectToLogin["queryString"]
    this.isLoginPageNow = false

    const currentPath = routerLocation.pathname
    const queryString = routerLocation.search

    if(currentPath === LOGOUT_PATH){
      return
    }

    if(currentPath === LOGIN_PATH){
      this.isLoginPageNow = true
      return
    }

    this.pathname = currentPath
    this.queryString = queryString
  }
}

AuthPageDispatcher.propTypes = {
  children: PropTypes.any,
}

class RidirectToLogin extends Component {
  render(){
    const {
      beforeLoginPath,
      queryString,
    } = this.props
    let state = initialStateOfRedirectToLogin
    state["beforeLoginPath"] = beforeLoginPath
    state["queryString"] = queryString
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
  queryString: PropTypes.string,
}

export default connectViewToStateAndActionCreaters(AuthPageDispatcher,
  (state) => {
    return {
      needLogin: state.sessionsAppReducer.needLogin
    }
  }, {actionAsyncCheckNeedLogin}
)
