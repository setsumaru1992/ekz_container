import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncThemeUpdate} from "~/reducers/themesAppReducer"
import themeFormCreator from "~/views/components/themes/themeForm"

class ThemeEdit extends Component {
  render() {
    const {
      actionAsyncThemeUpdate,
      theme,
    } = this.props
    const ThemeForm = themeFormCreator(theme.id)
    return (
      // onsubmitには関数オブジェクトを渡す（第一引数にフォームの内容のJSONデータが入る）
      <ThemeForm
        onSubmit={actionAsyncThemeUpdate}
        initialValues={{
          id: theme.id,
          name: theme.name,
        }}
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
  }, {actionAsyncThemeUpdate}
)




