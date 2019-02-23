import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom"
import {ButtonGroup, ToggleButtonGroup, Button, ToggleButton} from "react-bootstrap"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {
  actionAsyncChoiceDestroy,
  actionAsyncChoiceUpdateEvaluation,
  actionChoiceUpdateEvaluation
} from '~/reducers/choicesAppReducer';

class ChoiceShowElem extends Component {
  componentWillMount() {
    const {
      choice,
      actionChoiceUpdateEvaluation
    } = this.props
    actionChoiceUpdateEvaluation(choice.id, choice.evaluation)
  }

  render() {
    const {
      choice,
      themeId,
      actionAsyncChoiceDestroy,
      actionAsyncChoiceUpdateEvaluation,
      choiceEvaluationMap,
    } = this.props
    let nameTag = null
    const dispNameLength = 50
    const choiceName = choice.name.length > dispNameLength
      ? `${choice.name.substr(0, dispNameLength - 1)}...`
      : choice.name
    if(choice.url){
      nameTag = (
        <a href={choice.url} target={"blank"}>
          {choiceName}
        </a>)
    } else {
      nameTag = choiceName
    }
    const evaluationTagName = `evaluation_${choice.id}`
    return (
      <tr>
        <td style={{
          display: "flex",
        }}>
          <div style={{
            marginRight: "auto"
          }}>
            {nameTag}
          </div>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
          }}>
            <ToggleButtonGroup
              name={evaluationTagName} value={choiceEvaluationMap[choice.id]}
              onChange={(value, event)=>{actionAsyncChoiceUpdateEvaluation(choice.id, value, themeId)}}>
              <ToggleButton type="radio" name={evaluationTagName}  value={1} size="sm" variant="outline-primary">イイ！！</ToggleButton>
              <ToggleButton type="radio" name={evaluationTagName}  value={0} size="sm" variant="outline-primary">普通</ToggleButton>
              <ToggleButton type="radio" name={evaluationTagName}  value={-1} size="sm" variant="outline-primary">うーん...</ToggleButton>
            </ToggleButtonGroup>&emsp;
            <Button variant="outline-primary">編集</Button>&emsp;
            <Button variant="outline-primary" onClick={() => {
              const deleteOk = window.confirm("本当に削除してもよろしいですか？")
              if (!deleteOk) return
              actionAsyncChoiceDestroy(choice.id, themeId)
            }}
            >削除</Button>
          </div>
        </td>
      </tr>
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
      choiceEvaluationMap: state.choicesAppReducer.choiceEvaluationMap
    }
  }, {actionAsyncChoiceDestroy, actionAsyncChoiceUpdateEvaluation, actionChoiceUpdateEvaluation}
)