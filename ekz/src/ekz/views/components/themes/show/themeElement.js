import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncThemeDestroy} from '~/reducers/themesAppReducer';
import ChoiceShow from '~/views/components/choices/show'

class ThemeShowElem extends Component {
  render() {
    const {
      theme,
      actionAsyncThemeDestroy,
    } = this.props
    return (
      <tr>
        <td>
          {theme.name}
          <button>開く</button>
          <button>編集</button>
          <button onClick={() => {
            const deleteOk = window.confirm("本当に削除してもよろしいですか？")
            if(!deleteOk) return
            actionAsyncThemeDestroy(theme.id)
          }}
          >削除</button>
          {/*<ChoiceEkz />*/}
          <ChoiceShow themeId={theme.id}/>
        </td>
      </tr>
    )
  }
}

ThemeShowElem.propTypes = {
  theme: PropTypes.object
}

export default connectViewToStateAndActionCreaters(ThemeShowElem,
  (state) => {
    return {}
  }, {actionAsyncThemeDestroy}
)