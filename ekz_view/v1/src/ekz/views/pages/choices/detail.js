import React, {Component} from "react";
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncChoiceDetail} from "~/reducers/choicesAppReducer";
import {actionAsyncChoiceComments} from "~/reducers/choiceCommentsAppReducer";
import {Table} from "react-bootstrap"

class ChoiceDetail extends Component {
  componentWillMount() {
    const {
      location,
      actionAsyncChoiceDetail,
      actionAsyncChoiceComments,
    } = this.props
    const choiceId = location.pathname.split("/")[3]
    actionAsyncChoiceDetail(choiceId)
  }

  render() {
    const {
      choice,
    } = this.props
    return (
      <div>
        <h1>{choice.name}</h1>
        説明: {choice.description}<br/>
        <br/>
        {/*{choice.id !== undefined*/}
          {/*? <ChoiceCommentNew choiceId={choice.id}/>*/}
          {/*: null*/}
        {/*} <br/>*/}

        <br/>
      </div>
    )
  }
}

export default connectViewToStateAndActionCreaters(ChoiceDetail,
  (state) => {
    return {
      choice: state.choicesAppReducer.getChoiceDetail(),
      commentMap: state.choiceCommentsAppReducer.getCommentMap()
    }
  }, {actionAsyncChoiceDetail, actionAsyncChoiceComments}
)