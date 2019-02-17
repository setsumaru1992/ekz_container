import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncThemeDestroy} from '~/reducers/themesAppReducer';
import {Button} from "react-bootstrap";

class ThemeShowElem extends Component {
  render() {
    const {
      theme,
      actionAsyncThemeDestroy,
    } = this.props
    return (
      <tr>
        <td style={{
          display: "flex",
        }}>
          <NavLink
            to={{
              pathname: "/mypage/choice",
              search: `?t=${theme.id}`
            }}
            style={{
              marginRight: "auto"
            }}
          >
            {theme.name}
          </NavLink>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
          }}>
          <Button variant="outline-primary">開く</Button>
          <Button variant="outline-primary">編集</Button>
          <Button variant="outline-primary" onClick={() => {
            const deleteOk = window.confirm("本当に削除してもよろしいですか？")
            if(!deleteOk) return
            actionAsyncThemeDestroy(theme.id)
          }}
          >削除</Button>
          {/*<ChoiceEkz />*/}
          </div>
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