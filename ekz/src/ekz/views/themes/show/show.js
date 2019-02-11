import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connectViewToStateAndActionCreaters} from '~/views/_utils/connectorViewToOther'
import {actionAsyncThemeList, ACTION_CHOICE_LIST} from '~/reducers/themesReducer';
import ThemeShowElem from '~/views/themes/show/_elem'
import ThemeNew from "~/views/themes/new/new"


class ThemeShow extends Component {

  constructor(props) {
    super(props)
  }

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