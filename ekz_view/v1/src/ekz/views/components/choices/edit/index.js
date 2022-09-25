import React, {Component} from "react";
import PropTypes from "prop-types"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncChoiceUpdate} from "~/reducers/choicesAppReducer"
import choiceFormCreator from "~/views/components/choices/choiceForm"



class ChoiceEdit extends Component {
  render() {
    const {
      themeId,
      choice,
      actionAsyncChoiceUpdate,
      ekzIdList,
    } = this.props
    const execUpdate = (choice) => {
      actionAsyncChoiceUpdate(choice)
    }
    const ChoiceForm = choiceFormCreator(themeId, choice.id)
    return (
      <ChoiceForm
        onSubmit={execUpdate}
        initialValues={{
          id: choice.id,
          name: choice.name,
          url: choice.url,
          description: choice.description,
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
    return {
      ekzIdList: state.choicesAppReducer.ekzIdList
    }
  }, {actionAsyncChoiceUpdate}
)
