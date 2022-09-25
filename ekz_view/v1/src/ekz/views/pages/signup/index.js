import React, {Component} from "react";
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import SignupForm from "~/views/components/signup/signupForm"
import {actionAsyncSignupRegist} from "~/reducers/signupAppReducer"

class Signup extends Component{
  render(){
    const {
      actionAsyncSignupRegist,
    } = this.props
    const execRegist = (newuser) => {actionAsyncSignupRegist(newuser);alert("登録が完了しました。")}
    return (
      <div>
        <h1>会員登録</h1>
        <SignupForm
          onSubmit={execRegist}
          initialValues={{}}
        />
      </div>
    )
  }
}

export default connectViewToStateAndActionCreaters(Signup,
  (state) => {
    return {
    }
  }, {actionAsyncSignupRegist}
)