import React from "react";
import {Field} from "redux-form";
import formCreattor from "~/views/components/common/form/formCreator"
import {inputField, checkOrRadioFieldWithOwnLabel} from "~/views/components/common/form/formComponents"
import {
  Col,
  Form,
  Button,
} from "react-bootstrap";


const loginValidation = values => {
  const errors = {}
  if (!values.email) {
    errors.email = "必須項目です"
  }
  if (!values.password) {
    errors.password = "必須項目です"
  }
  return errors
}

const LoginForm = formCreattor(
  "loginForm",
  (handleSubmit, pristine, reset, submitting) => {return (
    <Form onSubmit={handleSubmit} action="#">
      <Field
        component={inputField}
        type="text"
        name="email"
        label="メールアドレス"/>
      <Field
        component={inputField}
        type="password"
        name="password"
        label="パスワード"/>
      <Field
        component={checkOrRadioFieldWithOwnLabel}
        type="checkbox"
        name="autologin"
        label="次から自動ログインする"/>

      <Form.Group>
        <Col smoffset={2} sm={5}>
          <Button variant={"outline-primary"} type="submit" disabled={pristine || submitting}>ログイン</Button>
          <Button variant={"outline-secondary"} type="button" disabled={pristine || submitting} onClick={reset}>クリア</Button>
        </Col>
      </Form.Group>
    </Form>
  )},
  loginValidation
)
export default LoginForm