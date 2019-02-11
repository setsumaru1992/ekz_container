import React from "react";
import {
  Col,
  Form,
} from 'react-bootstrap';


/*
fieldの主なパラメータ
{
  input,
  label,
  type,
  placeholder,
  meta: {touched, error, warning}
}
詳しくはChromeDevツールのReactペインで
 */
export const inputField = (field) => {
  return (
    <Form.Group>
      <Form.Row>
        <Col componentclass={Form.Label} sm={3}>{field.label}</Col>
        <Col sm={5}>
          <Form.Control
            {...field.input}
            placeholder={field.placeholder}
            type={field.type}
            className={"form-control"}
            isInvalid={isInvalid(field)}
          />
          <Form.Control.Feedback type="invalid">{noticeOf(field)}</Form.Control.Feedback>
        </Col>
      </Form.Row>
    </Form.Group>
  )
}

const isInvalid = field => {
  if (!field.meta.touched) {
    return false
  }
  return !!field.meta.error
}

const noticeOf = field => {
  if (field.meta.touched && field.meta.error) {
    return field.meta.error;
  } else {
    return null;
  }
};