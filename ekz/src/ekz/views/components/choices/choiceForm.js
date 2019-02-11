import React from "react";
import {Field} from 'redux-form';
import formCreattor from "~/views/components/common/form/formCreator"
import {inputField} from "~/views/components/common/form/formComponents"
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
  const choiceForm = formCreattor(
    formName,
    (handleSubmit, pristine, reset, submitting) => {return (
      <Form onSubmit={handleSubmit} action="#">
        <Field
          component={inputField}
          type="text"
          name="name"
          label="選択肢名"/>
        <Field
          component={inputField}
          type="text"
          name="url"
          label="URL"/>
        <Field
          component={inputField}
          type="number"
          name="evaluation"
          label="評価（1 / 0 / 1）"/>
        <Form.Group>
          <Col smoffset={2} sm={5}>
            {/*<ButtonGroup aria-label="Basic">*/}
            <Button variant={"outline-primary"} type="submit" disabled={pristine || submitting}>登録</Button>
            <Button variant={"outline-secondary"} type="button" disabled={pristine || submitting} onClick={reset}>クリア</Button>
            {/*</ButtonGroup>*/}
          </Col>
        </Form.Group>
      </Form>
    )},
    choiceValidation
  )
  return choiceForm
}
export default choiceFormCreator