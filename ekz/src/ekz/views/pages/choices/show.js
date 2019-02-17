import React, { Component } from 'react';
import PropTypes from 'prop-types'
import QueryStringParser from "~/views/features/utils/queryStringParser"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncChoiceList} from '~/reducers/choicesAppReducer';
import {actionChoiceVisibleForm} from '~/reducers/choicesViewReducer';
import ChoiceShowElem from '~/views/components/choices/show/choiceElement';
import ChoiceNew from '~/views/components/choices/new'

class ChoiceShow extends Component {

  componentWillMount() {
    const {
      location,
      actionAsyncChoiceList,
    } = this.props
    this.themeId = new QueryStringParser(location).getThemeId()
    actionAsyncChoiceList(this.themeId)
  }

  render() {
    const {
      choiceListMap,
      visibleFormMap,
      actionChoiceVisibleForm,
    } = this.props
    const choiceList = choiceListMap[this.themeId]
    return (
      <div>
        <h1>{"テーマ名"}</h1>
        <button onClick={()=>actionChoiceVisibleForm(this.themeId)}>追加</button>
        <br/>&emsp;
        {visibleFormMap[`${this.themeId}_`]
          ? <ChoiceNew themeId={this.themeId} />
          : ""
        }
        <table className="table table-hover table-striped">
          <tbody>
            {choiceList ? choiceList.map((choice) =>
              <ChoiceShowElem choice={choice} themeId={this.themeId} key={choice.id} />
            ) : null}
          </tbody>
        </table>
      </div>
    )
  }
}

ChoiceShow.propTypes = {
}

export default connectViewToStateAndActionCreaters(ChoiceShow,
  (state) => {
    return {
      choiceListMap: state.choicesAppReducer.choiceListMap,
      visibleFormMap: state.choicesViewReducer.visibleFormMap,
    }
  }, {actionAsyncChoiceList, actionChoiceVisibleForm}
)