import React from "react";
import {Field} from "redux-form";
import formCreator from "~/views/components/common/form/formCreator"
import {textareaField} from "~/views/components/common/form/formComponents"
import {choiceEvaluationField} from "~/views/components/choices/choiceEvaluationField"
import {
  Col,
  Form,
  Button,
} from "react-bootstrap";


const choiceCommentsValidation = values => {
  const errors = {}
  return errors
}

const choiceCommentFormCreator =(choiceId = null, commentId = null) => {
  let formName = "choiceCommentForm"
  if(choiceId != null) formName = `${formName}_${String(choiceId)}`
  if(commentId != null) formName = `${formName}_${String(commentId)}`
  const choiceCommentForm = formCreator(
    formName,
    (handleSubmit, pristine, reset, submitting) => {return (
      <Form onSubmit={handleSubmit} action="#">
        <Field
          component={textareaField}
          name="comment"
          label="コメント"/>
        <Form.Group>
          <Col smoffset={2} sm={5}>
            <Button variant={"outline-primary"} type="submit" disabled={pristine || submitting}>登録</Button>
            <Button variant={"outline-secondary"} type="button" disabled={pristine || submitting} onClick={reset}>クリア</Button>
          </Col>
        </Form.Group>
      </Form>
    )},
    choiceCommentsValidation
  )
  return choiceCommentForm
}
export default choiceCommentFormCreator