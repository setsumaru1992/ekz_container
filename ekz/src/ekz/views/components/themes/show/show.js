import React, {Component} from 'react';
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncThemeList} from '~/reducers/themesReducer';
import ThemeShowElem from '~/views/components/themes/show/_elem'
import ThemeNew from "~/views/components/themes/new/new"


class ThemeShow extends Component {
  render() {
    return (
      <div className="container">
        <table className="table">
          <tbody>
            {/*<ThemeShowElem/>*/}
            {this.props.themeList.map((theme) =>
              <ThemeShowElem theme={theme} key={theme.id} />
            )}
          </tbody>
        </table>
        <button>追加</button>
        <div>
          <ThemeNew />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.actionAsyncThemeList()
  }
}

export default connectViewToStateAndActionCreaters(ThemeShow,
  (state) => {
    return {themeList: state.themesReducer.themeList}
  }, {actionAsyncThemeList}
)