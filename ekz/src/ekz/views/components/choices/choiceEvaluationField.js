import React from "react";
import {Form, ToggleButtonGroup, ToggleButton} from "react-bootstrap"

export const choiceEvaluationButtonGroup = (choiceId, themeId, evaluation, onChangeEvent=()=>{}) => {
  const evaluationTagName = `evaluation_${choiceId}`
  return (
    <Form.Group>
      <ToggleButtonGroup
        name={evaluationTagName} value={evaluation}
        onChange={onChangeEvent}>
        <ToggleButton type="radio" name={evaluationTagName}  value={1} size="sm" variant="outline-primary">イイ！！</ToggleButton>
        <ToggleButton type="radio" name={evaluationTagName}  value={0} size="sm" variant="outline-primary">普通</ToggleButton>
        <ToggleButton type="radio" name={evaluationTagName}  value={-1} size="sm" variant="outline-primary">うーん...</ToggleButton>
      </ToggleButtonGroup>
    </Form.Group>
  )
}

export const choiceEvaluationField = (field) => {
  return (
    <Form.Group>
      <ToggleButtonGroup
        {...field.input}
        >
        <ToggleButton type="radio" value={1} size="sm" variant="outline-primary">イイ！！</ToggleButton>
        <ToggleButton type="radio" value={0} size="sm" variant="outline-primary">普通</ToggleButton>
        <ToggleButton type="radio" value={-1} size="sm" variant="outline-primary">うーん...</ToggleButton>
      </ToggleButtonGroup>
    </Form.Group>
  )
}