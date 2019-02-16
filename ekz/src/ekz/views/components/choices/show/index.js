import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncChoiceList} from '~/reducers/choicesAppReducer';
import {actionChoiceVisibleForm} from '~/reducers/choicesViewReducer';
import ChoiceShowElem from '~/views/components/choices/show/choiceElement';
import ChoiceNew from '~/views/components/choices/new'

class ChoiceShow extends Component {
  render() {
    const {
      choiceListMap,
      themeId,
      visibleFormMap,
      actionChoiceVisibleForm,
    } = this.props
    const choiceList = choiceListMap[themeId]
    return (
      <div>
        <button onClick={()=>actionChoiceVisibleForm(themeId)}>追加</button>
        <br/>&emsp;
        {visibleFormMap[`${themeId}_`]
          ? <ChoiceNew themeId={themeId} />
          : ""
        }
        <table className="table table-hover table-striped">
          <tbody>
            {choiceList ? choiceList.map((choice) =>
              <ChoiceShowElem choice={choice} themeId={themeId} key={choice.id} />
            ) : null}
          </tbody>
        </table>
      </div>
    )
  }

  componentWillMount() {
    this.props.actionAsyncChoiceList(this.props.themeId)
  }
}

ChoiceShow.propTypes = {
  themeId: PropTypes.number,
}

export default connectViewToStateAndActionCreaters(ChoiceShow,
  (state) => {
    return {
      choiceListMap: state.choicesAppReducer.choiceListMap,
      visibleFormMap: state.choicesViewReducer.visibleFormMap,
    }
  }, {actionAsyncChoiceList, actionChoiceVisibleForm}
)