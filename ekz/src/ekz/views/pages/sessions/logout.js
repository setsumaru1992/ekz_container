import React, {Component} from "react";
import { Redirect } from "react-router-dom"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncLogout} from "~/reducers/authAppReducer"

class Login extends Component {

  componentWillMount() {
    const {
      actionAsyncLogout
    } = this.props
    actionAsyncLogout()
  }

  render() {
    return (
      <Redirect to={"/login"} />
    )
  }
}

export default connectViewToStateAndActionCreaters(Login,
  (state) => {
    return {}
  }, {actionAsyncLogout}
)
