import React, {Component} from 'react';
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncThemeList} from '~/reducers/themesAppReducer';
import {actionVisibleThemeNew} from '~/reducers/themesViewReducer';
import ThemeShowElem from '~/views/components/themes/show/themeElement'
import ThemeNew from "~/views/components/themes/new"


class ThemeShow extends Component {
  render() {
    const {
      themeList,
      visibleThemeNew,
      actionVisibleThemeNew
    } = this.props
    return (
      <div>
        <h1>テーマ一覧</h1>
        <button onClick={() => actionVisibleThemeNew()}>追加</button>
        <div>
          {visibleThemeNew
            ? <ThemeNew />
            : ""
          }
        </div>
        <table className="table">
          <tbody>
            {themeList.map((theme) =>
              <ThemeShowElem theme={theme} key={theme.id} />
            )}
          </tbody>
        </table>
      </div>
    )
  }

  componentDidMount() {
    this.props.actionAsyncThemeList()
  }
}

export default connectViewToStateAndActionCreaters(ThemeShow,
  (state) => {
    return {
      themeList: state.themesAppReducer.themeList,
      visibleThemeNew: state.themesViewReducer.visibleThemeNew
    }
  }, {actionAsyncThemeList, actionVisibleThemeNew}
)