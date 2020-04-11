import React, {Component, Fragment} from "react";
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
import {ChoiceTagArea} from "~/features/choiceTag"
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

    return (
      <Col xs={12} md={12}>
        {this.choiceUpperContentContainer(choice, themeId, visibleFileFormMap, visibleFormMap, actionChoiceVisibleFileForm, actionAsyncChoiceDestroy, actionChoiceVisibleForm)}
        <ChoiceTagArea choiceId={choice.id} />
        {this.imageAreaContainer(choice)}
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
                  onClick={() => actionChoiceVisibleForm(themeId, choice.id)}>編集</Button>
        </div>
        {this.commentAreaContainer(commentMap, visibleCommentFormMap, choice.id, actionChoiceVisibleCommentForm)}
      </Col>
    )
  }

  choiceUpperContentContainer(choice, themeId, visibleFileFormMap, visibleFormMap, actionChoiceVisibleFileForm, actionAsyncChoiceDestroy, actionChoiceVisibleForm){
    return (
      <Fragment>
        <div style={{display: "flex"}}>
          <div style={{display: "flex"}}>
            {this.choicePropertyContainer(choice, themeId, actionChoiceVisibleForm)}
          </div>
          <div style={{display: "flex", marginLeft: "auto"}}>
            {this.choiceMenuArea(choice.id, themeId, actionChoiceVisibleFileForm, actionAsyncChoiceDestroy)}
          </div>
        </div>
        {this.choiceUpdateArea(choice, themeId, visibleFileFormMap, visibleFormMap)}
      </Fragment>
    )
  }

  choicePropertyContainer(choice, themeId, actionChoiceVisibleForm){
    const showChoicePropertyEditIcon = () => {return this.choicePropertyEditIcon(actionChoiceVisibleForm, themeId, choice.id)}
    return (
      <div>
        <div>
        {this.choiceNameArea(choice, showChoicePropertyEditIcon)}
        </div>
        <div>
        {this.choiceDescriptionArea(choice.description, showChoicePropertyEditIcon)}
        </div>
      </div>
    )
  }

  choiceNameArea(choice, showChoicePropertyEditIcon){
    const extractString = (str, maxLength) => {
      if(str.length > maxLength){
        return `${str.substr(0, maxLength - 1)}...`
      }else{
        return str
      }
    }
    const choiceName = extractString(choice.name, 20)

    let nameTag = null
    if (choice.url) {
      nameTag = (
        <a href={choice.url}
           onMouseDown={(e) => {
             e.preventDefault()
             window.open(choice.url, new Date().getTime())
           }}
        >
          {choiceName}<br />({extractString(choice.url, 20)})
        </a>
      )
    } else {
      nameTag = choiceName
    }

    const fontSize = "16px"
    return(
      <div style={{
        fontSize: fontSize,
        display: "inline-flex"
      }}>
        <h1 style={{
          fontSize: fontSize
        }}>
          {nameTag}
        </h1>
        &nbsp;{showChoicePropertyEditIcon()}&nbsp;{this.choiceEvaluateIcon()}
      </div>
    )
  }

  choiceDescriptionArea(choiceDescription, showChoicePropertyEditIcon){
    if(!choiceDescription || choiceDescription == "") return null
    return (
      <Fragment>
        <div style={{display: "inline-flex"}}>
          <div dangerouslySetInnerHTML={{__html: choiceDescription.replace(/\n/g, "<br />")}} />
          &nbsp;{showChoicePropertyEditIcon()}
        </div>
      </Fragment>
    )
  }

  choicePropertyEditIcon(actionChoiceVisibleForm, themeId, choiceId){
    return (
      <Fragment>
        <i className="fas fa-pen fa-fw" onClick={() => actionChoiceVisibleForm(themeId, choiceId)}></i>
      </Fragment>
    )
  }

  choiceEvaluateIcon(){
    const activeStyle = {color: "black"}
    const inactiveStyle = {color: "#CCCCCC"}
    const style = inactiveStyle
    return (
      <Fragment>
        <i className="fas fa-thumbs-up fa-fw" style={style}></i>(作成中)
      </Fragment>
    )
  }

  choiceMenuArea(choiceId, themeId, actionChoiceVisibleFileForm, actionAsyncChoiceDestroy){
    const iconStyle = {color: "black"}
    return (
      <Fragment>
        <NavLink
          to={{
            pathname: `/mypage/choice/${choiceId}`,
          }}
          style={{
            marginRight: "auto"
          }}
        >
          <i className="far fa-list-alt fa-fw" style={iconStyle}></i>
        </NavLink>&nbsp;

        <a href="#"><i className="fas fa-upload fa-fw" style={iconStyle} onClick={() => actionChoiceVisibleFileForm(choiceId)}></i></a>&nbsp;

        <a href="#"><i className="fas fa-trash fa-fw" style={iconStyle} onClick={() => {
          const deleteOk = window.confirm("本当に削除してもよろしいですか？")
          if (!deleteOk) return
          actionAsyncChoiceDestroy(choiceId, themeId)
        }}></i></a>
      </Fragment>
    )
  }

  choiceUpdateArea(choice, themeId, visibleFileFormMap, visibleFormMap){
    return (
      <Fragment>
        {visibleFileFormMap[`${choice.id}_`]
          ? <ChoiceImageNew choiceId={choice.id} themeId={themeId}/>
          : null}

        {visibleFormMap[`${themeId}_${choice.id}`]
          ? <ChoiceEdit themeId={themeId} choice={choice}/>
          : null
        }
      </Fragment>
    )
  }

  imageAreaContainer(choice){
    let imageSrc = "https://ekz-images.s3-ap-northeast-1.amazonaws.com/static/no_image.png"
    if (choice.image_filename) {
      imageSrc = `${EKZ_IMAGE_ROOT}${choice.image_filename.url}`
    } else if (choice.webpage_capture) {
      imageSrc = choice.webpage_capture
    }

    let imageUrl = choice.url ? choice.url : "#"

    return (
      <a href={imageUrl}
         onMouseDown={(e) => {
           e.preventDefault()
           window.open(imageUrl, new Date().getTime())
         }}
      >
        <img src={imageSrc} style={{width: "100%", padding: "0px 20px"}} />
      </a>
    )
  }

  commentAreaContainer(commentMap, visibleCommentFormMap, choiceId, actionChoiceVisibleCommentForm){
    const comments = commentMap[choiceId] ? commentMap[choiceId] : []
    return (
      <Fragment>
        <div>
          <div>
            コメント一覧
            <Button variant="outline-primary"
                    onClick={() => actionChoiceVisibleCommentForm(choiceId)}>コメント追加</Button>
          </div>
          {visibleCommentFormMap[`${choiceId}_`]
            ? <ChoiceCommentNew choiceId={choiceId}/>
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
      </Fragment>
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

