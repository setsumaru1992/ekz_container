import React from "react";
import {Field} from "redux-form";
import formCreator from "~/views/components/common/form/formCreator"
import {inputField} from "~/views/components/common/form/formComponents"
import {
  Col,
  Form,
  Button,
} from "react-bootstrap";

const signupValidation = values => {
  const errors = {}
  const fields = ["disp_name", "email", "password", "password_confirmation"]
  fields.forEach(fieldName => {
    if(values && !values[fieldName]){
      errors[fieldName] = "必須項目です。"
    }
  })
  if (values && values.password !== values.password_confirmation){
    errors.password = "パスワードが一致しません。"
  }
  return errors
}

const SignupForm = () => {
  return formCreator(
    "signupForm",
    (handleSubmit, pristine, reset, submitting) => {return (
      <Form onSubmit={handleSubmit} action="#">
        <Field
          component={inputField}
          type="text"
          name="disp_name"
          label="表示名"/>
        <Field
          component={inputField}
          type="email"
          name="email"
          label="メールアドレス"/>
        <Field
          component={inputField}
          type="password"
          name="password"
          label="パスワード"/>
        <Field
          component={inputField}
          type="password"
          name="password_confirmation"
          label="パスワード（確認用）"/>
        <Form.Group>
          <Col smoffset={2} sm={5}>
            <Button variant={"outline-primary"} type="submit" disabled={pristine || submitting}>登録</Button>
          </Col>
        </Form.Group>
      </Form>
    )},
    signupValidation
  )
}

export default SignupForm()