import React, {Fragment} from "react";
import {
  Col,
  Form,
} from "react-bootstrap";
import {} from "react-bootstrap";

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
        <Col sm={9}>
          <Form.Control
            {...field.input}
            placeholder={field.placeholder}
            type={field.type}
            isInvalid={isInvalid(field)}
          />
          <Form.Control.Feedback type="invalid">{noticeOf(field)}</Form.Control.Feedback>
        </Col>
      </Form.Row>
    </Form.Group>
  )
}

export const oneInlineInputField = (field) => {
  return (
    <Fragment>
      <Form.Control
        {...field.input}
        placeholder={field.placeholder}
        type={field.type}
        isInvalid={isInvalid(field)}
      />
      <Form.Control.Feedback type="invalid">{noticeOf(field)}</Form.Control.Feedback>
    </Fragment>
  )
}

export const inputFileField = (field) => {
  return (
    <Form.Group>
      <Form.Row>
        <Col componentclass={Form.Label} sm={3}>{field.label}</Col>
        <Col sm={9}>
          <Form.Control
            {...field.input}
            placeholder={field.placeholder}
            type="file"
            isInvalid={isInvalid(field)}
            accept={"image/*"}
            onChange={e => {
              e.preventDefault()
              field.input.onChange(e.target.files[0])
              field.onFieldChange && field.onFieldChange(e.target.files[0])
            }}
            onBlur={() => {}}
            value={undefined}
          />
          <Form.Control.Feedback type="invalid">{noticeOf(field)}</Form.Control.Feedback>
        </Col>
      </Form.Row>
    </Form.Group>
  )
}

export const textareaField = (field) => {
  return (
    <Form.Group>
      <Form.Row>
        <Col componentclass={Form.Label} sm={3}>{field.label}</Col>
        <Col sm={9}>
          <Form.Control
            {...field.input}
            as="textarea"
            placeholder={field.placeholder}
            isInvalid={isInvalid(field)}
          />
          <Form.Control.Feedback type="invalid">{noticeOf(field)}</Form.Control.Feedback>
        </Col>
      </Form.Row>
    </Form.Group>
  )
}


export const checkOrRadioFieldWithOwnLabel = (field) => {
  return (
    <Form.Group>
      <Form.Row>
        <Form.Check
          {...field.input}
          id={`${field.input.name}_${field.label}`}
          type={field.type}
          label={field.label}
        />
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