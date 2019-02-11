import {Field, reduxForm} from 'redux-form';
import React, {Component} from "react";
import {connectViewToStateAndActionCreaters} from '~/views/_utils/connectorViewToOther'
import {actionAsyncThemeNew} from "~/reducers/themesReducer"
import {
  Grid,
  Row,
  Col,
  Form,
  FormLabel,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';

const inputField = (
  {
    input,
    label,
    type,
    placeholder,
    meta: {touched, error, warning}
  }) => {
  const validationState = error
    ? "error"
    : warning
      ? "warning"
      : "success"
  return (
    <Form.Group controlId={input.name} validationstate={touched ? validationState: null} >
      <Col componentclass={FormLabel} sm={2}>{label}</Col>
      <Col sm={5}>
        <input {...input} id={input.name} placeholder={placeholder} type={type} className={"form-control"}/>
        {/*{*/}
        {/*touched && error &&*/}
        {/*/!*<HelpBlock>{error}</HelpBlock>*!/*/}
        {/*}*/}
      </Col>
    </Form.Group>
  )
}

const _ThemeForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting
  } = props;
  return (
    <form onSubmit={handleSubmit} action="#">
      名前&emsp;
      <Field
        //component="input"
        component={inputField}
        type="text"
        name="name"
        label="テーマ名" />
      <button type="submit" disabled={pristine || submitting}>追加</button>
    </form>
  )
}

const themeValidation = values => {
  const errors = {}
  if (!values.name) {
    errors.name = "必須項目です"
  }
  return errors
}

/*
propsにhandleSubmitなどをセット
 */
const ThemeForm = reduxForm({
  form: 'themeNew',
  validate: themeValidation
})(_ThemeForm);

class ThemeNew extends Component {
  render() {
    return (
      // onsubmitには関数オブジェクトを渡す（第一引数にフォームの内容のJSONデータが入る）
      <ThemeForm
        onSubmit={this.props.actionAsyncThemeNew}
        initialValues={{name: " "}}
      />
    )
  }
}

export default connectViewToStateAndActionCreaters(ThemeNew,
  (state) => {
    return {}
  }, {actionAsyncThemeNew}
)