import React, {Component} from "react";
import PropTypes from "prop-types"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncChoiceCommentNew} from "~/reducers/choiceCommentsAppReducer"
import choiceCommentFormCreator from "~/views/components/choiceComments/choiceCommentForm"


class ChoiceCommentNew extends Component {
  render() {
    const {
      choiceId,
      actionAsyncChoiceCommentNew,
      accessKey,
    } = this.props
    const ChoiceCommentForm = choiceCommentFormCreator()
    return (
      <ChoiceCommentForm
        onSubmit={actionAsyncChoiceCommentNew}
        // stateの更新によってinitialValuesが無化されるので常駐フォームは対策必要。choice情報や既存のコメント
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
  }, {actionAsyncChoiceCommentNew}
)
