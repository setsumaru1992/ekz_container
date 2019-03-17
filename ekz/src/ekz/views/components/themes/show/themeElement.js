import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom"
import {Button} from "react-bootstrap";
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncThemeDestroy} from '~/reducers/themesAppReducer';
import {
  actionThemeVisibleForm
} from "~/reducers/themesViewReducer"
import ThemeEdit from "~/views/components/themes/edit"

class ThemeShowElem extends Component {
  render() {
    const {
      theme,
      actionAsyncThemeDestroy,
      visibleFormMap,
      actionThemeVisibleForm,
    } = this.props
    return (
      <tr>
        <td>
          <div style={{
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
          <Button variant="outline-primary" onClick={()=>actionThemeVisibleForm(theme.id)}>編集</Button>
          <Button variant="outline-primary" onClick={() => {
            const deleteOk = window.confirm("本当に削除してもよろしいですか？")
            if(!deleteOk) return
            actionAsyncThemeDestroy(theme.id)
          }}
          >削除</Button>
          {/*<ChoiceEkz />*/}
          </div>
          </div>
          <br/>&emsp;
          {visibleFormMap[`${theme.id}`]
            ? <ThemeEdit theme={theme} />
            : ""
          }
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
    return {
      visibleFormMap: state.themesViewReducer.visibleFormMap,
    }
  }, {
    actionAsyncThemeDestroy,
    actionThemeVisibleForm
  }
)