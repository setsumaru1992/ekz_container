import React from "react";
import {Field} from "redux-form";
import formCreator from "~/views/components/common/form/formCreator"
import {oneInlineInputField} from "~/views/components/common/form/formComponents"
import {
  Col,
  Form,
  Button,
} from "react-bootstrap";


const validator = values => {
  const errors = {}
  if (!values.name) {
    errors.name = "必須項目です"
  }
  return errors
}

export default (choiceId = null, tagId = null) => {
  let formName = "choiceTagForm"
  if(choiceId != null) formName = `${formName}_${String(choiceId)}`
  if(tagId != null) formName = `${formName}_${String(tagId)}`

  return formCreator(
    formName,
    (handleSubmit, pristine, reset, submitting) => {return (
      <Form onSubmit={handleSubmit} action="#" style={{display: "inline-block"}}>
        <Field
          component={oneInlineInputField}
          type="text"
          name="name"
          label=""/>
      </Form>
    )},
    validator
  )
}