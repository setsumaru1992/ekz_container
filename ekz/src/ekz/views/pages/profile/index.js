import React, {Component} from "react";
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncProfileIndex} from "~/reducers/profileAppReducer"
import Table from "react-bootstrap/Table"

class Profile extends Component {
  componentWillMount() {
    const {
      actionAsyncProfileIndex
    } = this.props
    actionAsyncProfileIndex()
  }

  render(){
    const {
      dispName,
      email
    } = this.props
    return (
      <div>
        <h1>{dispName}さんの情報</h1>
        <h2>基本情報</h2>
        <p>表示名：{dispName} <button>変更する(作成中)</button></p>
        <h2>メールアドレス</h2>
        <p>{email} <button>変更する(作成中)</button></p>
        <Table striped bordered hover>
          <tbody>
          <tr><td>パスワードを変更する(作成中)</td></tr>
          <tr><td>退会する(作成中)</td></tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default connectViewToStateAndActionCreaters(Profile,
  (state) => {
    return {
      dispName: state.profileAppReducer.get("dispName"),
      email: state.profileAppReducer.get("email"),
    }
  }, {actionAsyncProfileIndex}
)