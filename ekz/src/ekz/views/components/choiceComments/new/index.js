import React, {Component} from "react";
import PropTypes from "prop-types"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncChoiceCommentNew} from "~/reducers/choiceCommentsAppReducer"
import choiceCommentFormCreator from "~/views/components/choiceComments/choiceCommentForm"


class ChoiceCommentNew extends Component {
  render() {
    const {
      choiceId,
      actionAsyncChoiceImageNew,
      accessKey,
    } = this.props
    const ChoiceCommentForm = choiceCommentFormCreator(choiceId)
    return (
      <ChoiceCommentForm
        onSubmit={actionAsyncChoiceImageNew}
        initialValues={{
          id: "",
          comment: "",
          // 暫定対応　user_idを取得するため。本来は毎回アクセスキーチェックするからその時に取得可能
          access_key: accessKey,
          choice_id: choiceId
        }}
      />
    )
  }
}

ChoiceCommentNew.propTypes = {
  choiceId: PropTypes.number,
}

export default connectViewToStateAndActionCreaters(ChoiceCommentNew,
  (state) => {
    return {
      accessKey: state.authManager.getAccessKey()
    }
  }, {actionAsyncChoiceImageNew: actionAsyncChoiceCommentNew}
)
