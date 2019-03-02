import React from "react";
import {Field} from 'redux-form';
import formCreator from "~/views/components/common/form/formCreator"
import {inputField} from "~/views/components/common/form/formComponents"
import {choiceEvaluationField} from "~/views/components/choices/choiceEvaluationField"
import {
  Col,
  Form,
  Button,
} from 'react-bootstrap';


const choiceValidation = values => {
  const errors = {}
  if (!values.name) {
    errors.name = "必須項目です"
  }
  return errors
}

const choiceFormCreator =(themeId = null, choiceId = null) => {
  let formName = 'choiceForm'
  if(themeId != null) formName = `${formName}_${String(themeId)}`
  if(choiceId != null) formName = `${formName}_${String(choiceId)}`
  let buttonTagName = "evaluation"
  if(choiceId != null) formName = `${buttonTagName}_${String(choiceId)}`
  const choiceForm = formCreator(
    formName,
    (handleSubmit, pristine, reset, submitting) => {return (
      <Form onSubmit={handleSubmit} action="#">
        <Field
          component={inputField}
          type="text"
          name="name"
          label="チョイス名"/>
        <Field
          component={inputField}
          type="text"
          name="url"
          label="URL"/>
        <Field
          component={choiceEvaluationField}
          name="evaluation"/>
        <Form.Group>
          <Col smoffset={2} sm={5}>
            <Button variant={"outline-primary"} type="submit" disabled={pristine || submitting}>登録</Button>
            <Button variant={"outline-secondary"} type="button" disabled={pristine || submitting} onClick={reset}>クリア</Button>
          </Col>
        </Form.Group>
      </Form>
    )},
    choiceValidation
  )
  return choiceForm
}
export default choiceFormCreator