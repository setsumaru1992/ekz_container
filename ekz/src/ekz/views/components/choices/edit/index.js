import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncChoiceNew} from "~/reducers/choicesAppReducer"
import choiceFormCreator from "~/views/components/choices/choiceForm"



class ChoiceEdit extends Component {
  render() {
    const {
      themeId,
      choice,
      actionAsyncChoiceNew
    } = this.props
    const ChoiceForm = choiceFormCreator(themeId, choice.id)
    return (
      <ChoiceForm
        onSubmit={actionAsyncChoiceNew}
        initialValues={{
          name: choice.name,
          url: choice.url,
          evaluation: choice.evaluation,
          theme_id: themeId
        }}
      />
    )
  }
}

ChoiceEdit.propTypes = {
  themeId: PropTypes.number,
  choice: PropTypes.object
}

export default connectViewToStateAndActionCreaters(ChoiceEdit,
  (state) => {
    return {}
  }, {actionAsyncChoiceNew}
)
