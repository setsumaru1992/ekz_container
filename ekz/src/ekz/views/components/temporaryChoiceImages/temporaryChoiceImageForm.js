import React from "react";
import {Field} from "redux-form";
import formCreator from "~/views/components/common/form/formCreator"
import {inputFileField} from "~/views/components/common/form/formComponents"
import {choiceEvaluationField} from "~/views/components/choices/choiceEvaluationField"
import {
  Col,
  Form,
  Button,
} from "react-bootstrap";


const choiceImagesValidation = values => {
  const errors = {}
  return errors
}

const choiceImageFormCreator =(choiceId = null, imageId = null) => {
  let formName = `choiceImageForm_${String(choiceId)}`
  if(imageId != null) formName = `${formName}_${String(imageId)}`
  const choiceImageForm = formCreator(
    formName,
    (handleSubmit, pristine, reset, submitting) => {return (
      <Form onSubmit={handleSubmit} name="uploadForm" action="#">
        <Field
          component={inputFileField}
          name="image"
          label="画像"
        />
        <Form.Group>
          <Col smoffset={2} sm={5}>
            <Button variant={"outline-primary"} type="submit" className={"upload-button"} disabled={pristine || submitting}>アップロード</Button>
            <Button variant={"outline-secondary"} type="button" disabled={pristine || submitting} onClick={reset}>クリア</Button>
          </Col>
        </Form.Group>
      </Form>
    )},
    choiceImagesValidation
  )
  return choiceImageForm
}
export default choiceImageFormCreator