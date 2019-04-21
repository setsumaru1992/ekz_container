import React from "react";
import {Field} from "redux-form";
import formCreattor from "~/views/components/common/form/formCreator"
import {inputField} from "~/views/components/common/form/formComponents"
import {
  Col,
  Form,
  Button,
} from "react-bootstrap";


const themeValidation = values => {
  const errors = {}
  if (!values.name) {
    errors.name = "必須項目です"
  }
  return errors
}

const themeFormCreator = (themeId = null) => {
  let formName = "themeForm"
  if(themeId != null) formName = `${formName}_${String(themeId)}`
  const themeForm = formCreattor(
    formName,
    (handleSubmit, pristine, reset, submitting) => {return (
      <Form onSubmit={handleSubmit} action="#">
        <Field
          component={inputField}
          type="text"
          name="name"
          label="テーマ名"/>
        <Form.Group>
          <Col smoffset={2} sm={5}>
            <Button variant={"outline-primary"} type="submit" disabled={pristine || submitting}>登録</Button>
            <Button variant={"outline-secondary"} type="button" disabled={pristine || submitting} onClick={reset}>クリア</Button>
          </Col>
        </Form.Group>
      </Form>
    )},
    themeValidation
  )
  return themeForm
}

export default themeFormCreator