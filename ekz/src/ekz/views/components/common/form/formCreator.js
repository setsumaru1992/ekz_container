import {reduxForm} from 'redux-form';
import React from "react";

const formCreattor = (
  formName,
  formJsx = (handleSubmit, pristine, reset, submitting) => {return (<br/>)},
  validation = (vallues) => {}
) => {
  const jsxForReduxForm = (props) => {
    const {
      handleSubmit, // propsのonsubmitで定義する関数
      pristine,
      reset,
      submitting
    } = props;
    return formJsx(handleSubmit, pristine, reset, submitting)
  }

  /*
  reduxFormをかませることでpropsにhandleSubmitなどをセット
   */
  return reduxForm({
    form: formName,
    validate: validation
  })(jsxForReduxForm);
}

export default formCreattor