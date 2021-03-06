import React, {Component} from "react";
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncThemeNew} from "~/reducers/themesAppReducer"
import themeFormCreator from "~/views/components/themes/themeForm"
import authCookieManager from "~/models/auth/authCookieManager";

class ThemeNew extends Component {
  render() {
    const {
      actionAsyncThemeNew
    } = this.props
    const ThemeForm = themeFormCreator()
    return (
      // onsubmitには関数オブジェクトを渡す（第一引数にフォームの内容のJSONデータが入る）
      <ThemeForm
        onSubmit={actionAsyncThemeNew}
        initialValues={{
          id: "",
          name: "",
          access_key: authCookieManager.getAccessKey()
        }}
      />
    )
  }
}

export default connectViewToStateAndActionCreaters(ThemeNew,
  (state) => {
    return {}
  }, {actionAsyncThemeNew}
)




