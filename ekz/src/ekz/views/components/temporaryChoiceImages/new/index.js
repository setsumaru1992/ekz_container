import React, {Component} from "react";
import PropTypes from "prop-types"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncChoiceImageNew} from "~/reducers/choicesAppReducer"
import choiceImageFormCreator from "~/views/components/temporaryChoiceImages/temporaryChoiceImageForm"

class ChoiceImageNew extends Component {
  render() {
    const {
      actionAsyncChoiceImageNew,
      choiceId
    } = this.props
    const ChoiceImageForm = choiceImageFormCreator()
    return (
      // onsubmitには関数オブジェクトを渡す（第一引数にフォームの内容のJSONデータが入る）
      <ChoiceImageForm
        onSubmit={actionAsyncChoiceImageNew}
        initialValues={{
          id: "",
          choice_id: choiceId,
        }}
      />
    )
  }
}

ChoiceImageNew.propTypes = {
  choiceId: PropTypes.number,
}

export default connectViewToStateAndActionCreaters(ChoiceImageNew,
  (state) => {
    return {}
  }, {actionAsyncChoiceImageNew}
)




