import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncLogin} from "~/reducers/sessionsAppReducer"
import LoginForm from "~/views/components/sessions/loginForm"



class Login extends Component {
  render() {
    const {
      actionAsyncLogin,
      isLoginSuccess,
    } = this.props
    return (
      <div>
        <LoginForm
          onSubmit={actionAsyncLogin}
          initialValues={{
            email: "",
            password: "",
          }}
        />
        {String(isLoginSuccess)}
      </div>
    )
  }
}

Login.propTypes = {
}

export default connectViewToStateAndActionCreaters(Login,
  (state) => {
    return {
      isLoginSuccess: state.sessionsAppReducer.isLoginSuccess
    }
  }, {actionAsyncLogin}
)
