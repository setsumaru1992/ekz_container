import React, {Component} from "react";
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncChoiceDetail} from "~/reducers/choicesAppReducer";
import {actionAsyncChoiceComments} from "~/reducers/choiceCommentsAppReducer";
import {Table} from "react-bootstrap"
import ChoiceCommentNew from "~/views/components/choiceComments/new"

class ChoiceDetail extends Component {
  componentWillMount() {
    const {
      location,
      actionAsyncChoiceDetail,
      actionAsyncChoiceComments,
    } = this.props
    const choiceId = location.pathname.split("/")[3]
    actionAsyncChoiceDetail(choiceId)
    actionAsyncChoiceComments(choiceId)
  }

  render() {
    const {
      choice,
      commentMap,
    } = this.props
    window.commentMap = commentMap
    console.log(`choice.id: ${choice.id}`)
    const comments = commentMap[choice.id] ? commentMap[choice.id] : []
    return (
      <div>
        <h1>{choice.name}</h1>
        説明: {choice.description}<br/>
        <br/>
        <ChoiceCommentNew choiceId={choice.id}/><br/>

        <br/>
        コメント一覧<br/>
        <Table>
          <tbody>
          {comments.map(comment =>
            <tr key={comment.id}>
              <td>{comment.content} &emsp; {comment.created_by} &emsp; {comment.created_at}&emsp; 編集 &emsp; 削除</td>
            </tr>
          )
          }
          </tbody>
        </Table>
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