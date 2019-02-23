import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncThemeNew} from "~/reducers/themesAppReducer"
import themeFormCreator from "~/views/components/themes/themeForm"

class ThemeEdit extends Component {
  render() {
    const {
      actionAsyncThemeNew,
      theme,
    } = this.props
    const ThemeForm = themeFormCreator(theme.id)
    return (
      // onsubmitには関数オブジェクトを渡す（第一引数にフォームの内容のJSONデータが入る）
      <ThemeForm
        onSubmit={actionAsyncThemeNew}
        initialValues={{name: theme.name}}
      />
    )
  }
}

ThemeEdit.propTypes = {
  theme: PropTypes.object,
}

export default connectViewToStateAndActionCreaters(ThemeEdit,
  (state) => {
    return {}
  }, {actionAsyncThemeNew}
)




