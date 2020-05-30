import React, {Component} from "react";
import PropTypes from "prop-types"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncChoiceNew} from "~/reducers/choicesAppReducer"
import choiceFormCreator from "~/views/components/choices/choiceForm"

class ChoiceNew extends Component {
  static propTypes = {
    themeId: PropTypes.number,
  }

  render() {
    const {
      themeId,
      actionAsyncChoiceNew
    } = this.props
    const ChoiceForm = choiceFormCreator(themeId)
    return (
      <ChoiceForm
        onSubmit={actionAsyncChoiceNew}
        initialValues={{
          id: null,
          name: "",
          url: "",
          description: "",
          evaluation: 0,
          image: null,
          theme_id: themeId,
        }}
      />
    )
  }
}

export default connectViewToStateAndActionCreaters(ChoiceNew,
  (state) => {
    return {}
  }, {actionAsyncChoiceNew}
)
