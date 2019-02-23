import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncChoiceNew} from "~/reducers/choicesAppReducer"
import choiceFormCreator from "~/views/components/choices/choiceForm"



class ChoiceNew extends Component {
  render() {
    const {
      themeId,
      actionAsyncChoiceNew
    } = this.props
    const ChoiceForm = choiceFormCreator(themeId, null)
    return (
      <ChoiceForm
        onSubmit={actionAsyncChoiceNew}
        initialValues={{
          name: "",
          url: "",
          evaluation: 0,
          theme_id: themeId
        }}
      />
    )
  }
}

ChoiceNew.propTypes = {
  themeId: PropTypes.number,
}

export default connectViewToStateAndActionCreaters(ChoiceNew,
  (state) => {
    return {}
  }, {actionAsyncChoiceNew}
)
