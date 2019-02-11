import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connectViewToStateAndActionCreaters} from '~/views/_utils/connectorViewToOther'
import {actionAsyncChoiceList} from '~/reducers/choicesReducer';
import ChoiceShowElem from '~/views/choices/show/_elem';

class ChoiceShow extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <table className="table table-hover table-striped">
          <tbody>
            {this.props.choiceList.map((choice) =>
              <ChoiceShowElem choice={choice} key={choice.id} />
            )}
          </tbody>
        </table>
        <button>選び直す</button>
        <button>追加</button>
        <br/>&emsp;
      </div>
    )
  }

  componentDidMount() {
    this.props.actionAsyncChoiceList()
  }
}

ChoiceShow.propTypes = {
  themeId: PropTypes.number,
}

export default connectViewToStateAndActionCreaters(ChoiceShow,
  (state) => {
    return {choiceList: state.choicesReducer.choiceList}
  }, {actionAsyncChoiceList}
)