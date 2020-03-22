import React, {Component} from "react";
import PropTypes from "prop-types"
import {NavLink} from "react-router-dom"
import {Card, Col, Button, Table} from "react-bootstrap"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {
  actionAsyncChoiceDestroy,
  actionAsyncChoiceUpdateEvaluation,
  actionChoiceUpdateEvaluation
} from "~/reducers/ekzAppReducer"
import {
  actionChoiceVisibleForm,
  actionChoiceVisibleFileForm,
  actionChoiceVisibleCommentForm,
} from "~/reducers/choicesViewReducer"
import {actionAsyncChoiceComments} from "~/reducers/choiceCommentsAppReducer";
import {EKZ_IMAGE_ROOT} from "~/common/const"
import ChoiceEdit from "~/views/components/choices/edit"
import ChoiceImageNew from "~/views/components/temporaryChoiceImages/new"
import ChoiceCommentNew from "~/views/components/choiceComments/new"
import {choiceEvaluationButtonGroup} from "~/views/components/choices/choiceEvaluationField"
import {isSmartPhone} from "~/common/userAgentChecker"

class EkzShowElem extends Component {
  /*
  componentWillMount, componentDidMount（mount時に１回起動）以外で
  つまりrender, conponentWillUpdate, componentDidUpdateで
  stateを更新できないため、evaluationやリストの更新は個々のelementではなくて一括で行う
  */

  componentWillMount() {
    const {
      choice,
      actionAsyncChoiceComments,
    } = this.props
    actionAsyncChoiceComments(choice.id)
  }

  render() {
    const {
      choice,
      themeId,
      actionAsyncChoiceDestroy,
      actionAsyncChoiceUpdateEvaluation,
      actionChoiceVisibleForm,
      visibleFormMap,
      visibleFileFormMap,
      visibleCommentFormMap,
      actionChoiceVisibleFileForm,
      actionChoiceVisibleCommentForm,
      commentMap,
    } = this.props
    let nameTag = null
    const dispNameLength = 30
    const choiceName = choice.name.length > dispNameLength
      ? `${choice.name.substr(0, dispNameLength - 1)}...`
      : choice.name
    if (choice.url) {
      nameTag = (
        <a href="#"
           onMouseDown={() => {
             window.open(choice.url, new Date().getTime())
           }}
        >
          {choiceName}
        </a>)
    } else {
      nameTag = choiceName
    }

    let imageField = null
    if (choice.image_filename) {
      imageField = (
        <a href={`${EKZ_IMAGE_ROOT}${choice.image_filename.url}`} target="blank">
          <img src={`${EKZ_IMAGE_ROOT}${choice.image_filename.url}`} width="150px" height="150px"/>
        </a>
      )
    } else if (choice.webpage_capture) {
      imageField = (
        <img src={`${choice.webpage_capture.url}`}  width="150px" height="150px"/>
      )
    }

    let cardStyle = {
      padding: "20px 25px",
      margin: "10px 3px",
      textAlign: "center",
      background: "#fff",
    }
    if(isSmartPhone()){
      cardStyle["padding"] = "20px 0px"
    } else {
      cardStyle["padding"] = "20px 25px"
    }
    const comments = commentMap[choice.id] ? commentMap[choice.id] : []
    return (
      <Col xs={12} md={12}>
          <h1 style={{
            fontSize: "30px"
          }}>{nameTag}</h1>
            {imageField}
            <div>
              {choiceEvaluationButtonGroup(
                choice.id, themeId, choice.evaluation,
                (value, event) => {
                  actionAsyncChoiceUpdateEvaluation(choice.id, value, themeId)
                }
              )}
            </div>
        <div>
            <Button variant="outline-primary"
                    onClick={() => actionChoiceVisibleForm(themeId, choice.id)}>編集</Button>&emsp;
            <Button variant="outline-primary"
                    onClick={() => actionChoiceVisibleFileForm(choice.id)}>画像アップロード</Button>&emsp;
            <Button variant="outline-primary" onClick={() => {
              const deleteOk = window.confirm("本当に削除してもよろしいですか？")
              if (!deleteOk) return
              actionAsyncChoiceDestroy(choice.id, themeId)
            }}
            >削除</Button>
        </div>
          {visibleFileFormMap[`${choice.id}_`]
            ? <ChoiceImageNew choiceId={choice.id} themeId={themeId}/>
            : null}

          {visibleFormMap[`${themeId}_${choice.id}`]
            ? <ChoiceEdit themeId={themeId} choice={choice}/>
            : ""
          }
        <div>
            <div>
              コメント一覧
              <Button variant="outline-primary"
                      onClick={() => actionChoiceVisibleCommentForm(choice.id)}>コメント追加</Button>
            </div>
          {visibleCommentFormMap[`${choice.id}_`]
            ? <ChoiceCommentNew choiceId={choice.id}/>
            : null}
        <Table>
          <tbody>
          {comments.map(comment => {
            const rawDateStr = comment.created_at
            const dateStr = `${rawDateStr.substr(0,4)}/${rawDateStr.substr(5,2)}/${rawDateStr.substr(8,2)} ${rawDateStr.substr(11,2)}:${rawDateStr.substr(14,2)}`
            return (<tr key={comment.id}>
              <td>
                <div style={{
                  fontSize: "10px",
                  color: "grey",
                }}>{dateStr}&nbsp;by&nbsp;{comment.created_by}</div>
                {comment.content}
                <div>編集 &emsp; 削除</div>
                </td>
            </tr>
            )})
          }
          </tbody>
        </Table>
        </div>
        <NavLink
          to={{
            pathname: `/mypage/choice/${choice.id}`,
          }}
          style={{
            marginRight: "auto"
          }}
        >
          More...
        </NavLink>
      </Col>
    )
  }
}

EkzShowElem.propTypes = {
  choice: PropTypes.object,
  themeId: PropTypes.number
}

export default connectViewToStateAndActionCreaters(EkzShowElem,
  (state) => {
    return {
      visibleFormMap: state.choicesViewReducer.visibleFormMap,
      visibleFileFormMap: state.choicesViewReducer.visibleFileFormMap,
      visibleCommentFormMap: state.choicesViewReducer.visibleCommentFormMap,
      commentMap: state.choiceCommentsAppReducer.getCommentMap(),
    }
  }, {
    actionAsyncChoiceDestroy,
    actionAsyncChoiceUpdateEvaluation,
    actionChoiceUpdateEvaluation,
    actionChoiceVisibleForm,
    actionChoiceVisibleFileForm,
    actionChoiceVisibleCommentForm,
    actionAsyncChoiceComments,
  }
)
