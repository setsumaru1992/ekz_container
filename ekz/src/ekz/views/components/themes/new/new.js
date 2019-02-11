import React, {Component} from "react";
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncThemeNew} from "~/reducers/themesReducer"
import ThemeForm from "~/views/components/themes/themeForm"

class ThemeNew extends Component {
  render() {
    return (
      // onsubmitには関数オブジェクトを渡す（第一引数にフォームの内容のJSONデータが入る）
      <ThemeForm
        onSubmit={this.props.actionAsyncThemeNew}
        initialValues={{name: ""}}
      />
    )
  }
}

export default connectViewToStateAndActionCreaters(ThemeNew,
  (state) => {
    return {}
  }, {actionAsyncThemeNew}
)




