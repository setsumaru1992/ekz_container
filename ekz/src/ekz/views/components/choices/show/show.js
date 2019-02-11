import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncChoiceList} from '~/reducers/choicesReducer';
import ChoiceShowElem from '~/views/components/choices/show/_elem';
import ChoiceNew from '~/views/components/choices/new/new'

class ChoiceShow extends Component {
  render() {
    return (
      <div>
        <table className="table table-hover table-striped">
          <tbody>
            {this.props.choiceListMap[this.props.themeId] ? this.props.choiceListMap[this.props.themeId].map((choice) =>
              <ChoiceShowElem choice={choice} themeId={this.props.themeId} key={choice.id} />
            ) : null}
          </tbody>
        </table>
        <button>追加</button>
        <br/>&emsp;
        <ChoiceNew themeId={this.props.themeId} />
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
    return {choiceListMap: state.choicesReducer.choiceListMap}
  }, {actionAsyncChoiceList}
)