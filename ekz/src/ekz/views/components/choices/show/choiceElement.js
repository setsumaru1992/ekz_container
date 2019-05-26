import React, { Component } from "react";
import PropTypes from "prop-types"
import {NavLink} from "react-router-dom"
import {Card, Col, Button} from "react-bootstrap"
import {EKZ_IMAGE_ROOT} from "~/common/const"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {
  actionAsyncChoiceDestroy,
  actionAsyncChoiceUpdateEvaluation,
  actionChoiceUpdateEvaluation
} from "~/reducers/choicesAppReducer"
import {
  actionChoiceVisibleForm,
  actionChoiceVisibleFileForm,
} from "~/reducers/choicesViewReducer"
import ChoiceEdit from "~/views/components/choices/edit"
import ChoiceImageNew from "~/views/components/temporaryChoiceImages/new"
import {choiceEvaluationButtonGroup} from "~/views/components/choices/choiceEvaluationField"

class ChoiceShowElem extends Component {
  /*
  componentWillMount, componentDidMount（mount時に１回起動）以外で
  つまりrender, conponentWillUpdate, componentDidUpdateで
  stateを更新できないため、evaluationやリストの更新は個々のelementではなくて一括で行う
  */

  render() {
    const {
      choice,
      themeId,
      actionAsyncChoiceDestroy,
      actionAsyncChoiceUpdateEvaluation,
      actionChoiceVisibleForm,
      visibleFormMap,
      visibleFileFormMap,
      actionChoiceVisibleFileForm,
    } = this.props
    let nameTag = null
    const dispNameLength = 50
    const choiceName = choice.name.length > dispNameLength
      ? `${choice.name.substr(0, dispNameLength - 1)}...`
      : choice.name
    if(choice.url){
      nameTag = (
        <a href="#"
           onMouseDown={() => {window.open(choice.url, new Date().getTime())}}
        >
          {choiceName}
        </a>)
    } else {
      nameTag = choiceName
    }

    return (
      <Col xs={12} md={12}>
        <Card style={{
          padding: "20px 25px",
          margin: "10px 3px",
          textAlign: "center",
          background: "#fff",
        }}>
        {/*<Card.Img />*/}
        <h3 style={{
          height: "40px",
          fontSize: "18px",
          fontWeight: "700",
          fontStyle: "normal",
          marginBottom: "6px"
        }}>{nameTag}</h3>
          <Card.Body>
            {choice.image_filename
              ? <a href={`${EKZ_IMAGE_ROOT}${choice.image_filename.url}`} target="blank">
                <img src={`${EKZ_IMAGE_ROOT}${choice.image_filename.url}`} width="150px" height="150px"  />
              </a>
              : null}
            <div>
              {choiceEvaluationButtonGroup(
                choice.id, themeId, choice.evaluation,
                (value, event)=>{actionAsyncChoiceUpdateEvaluation(choice.id, value, themeId)}
              )}
            </div>
            <Button variant="outline-primary" onClick={()=>actionChoiceVisibleForm(themeId, choice.id)}>編集</Button>&emsp;
            <Button variant="outline-primary" onClick={()=>actionChoiceVisibleFileForm(choice.id)}>アップロード</Button>&emsp;
            <Button variant="outline-primary" onClick={() => {
              const deleteOk = window.confirm("本当に削除してもよろしいですか？")
              if (!deleteOk) return
              actionAsyncChoiceDestroy(choice.id, themeId)
            }}
            >削除</Button><br/>
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
            {visibleFileFormMap[`${choice.id}_`]
              ? <ChoiceImageNew choiceId={choice.id}/>
              : null}

            {visibleFormMap[`${themeId}_${choice.id}`]
              ? <ChoiceEdit themeId={themeId} choice={choice} />
              : ""
            }
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

ChoiceShowElem.propTypes = {
  choice: PropTypes.object,
  themeId: PropTypes.number
}

export default connectViewToStateAndActionCreaters(ChoiceShowElem,
  (state) => {
    return {
      visibleFormMap: state.choicesViewReducer.visibleFormMap,
      visibleFileFormMap: state.choicesViewReducer.visibleFileFormMap,
    }
  }, {
    actionAsyncChoiceDestroy,
    actionAsyncChoiceUpdateEvaluation,
    actionChoiceUpdateEvaluation,
    actionChoiceVisibleForm,
    actionChoiceVisibleFileForm,
  }
)