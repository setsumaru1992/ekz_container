import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Row, Col, Form, Button } from 'react-bootstrap';

interface Login {
  email: string;
  password: string;
  autoLogin: boolean;
}

export default (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Login>();
  const onSubmit: SubmitHandler<Login> = (input) => {
    if (Object.keys(errors).length !== 0) return false;
    console.log(input);
    // addTheme(input, {
    //   onCompleted: () => {
    //     refetch();
    //     reset();
    //   },
    // });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Row>
          <Col sm={3}>
            <Form.Label>メールアドレス</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              {...register('email', { required: true })}
              placeholder="必須"
            />
            {errors.email && <span>This field is required</span>}
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <Row>
          <Col sm={3}>
            <Form.Label>パスワード</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              {...register('password', { required: true })}
              placeholder="必須"
            />
            {errors.password && <span>This field is required</span>}
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <Row>
          <Col sm={12}>
            <Form.Check
              type="checkbox"
              label="次から自動でログインする"
              {...register('autoLogin', { required: false })}
            />
          </Col>
        </Row>
      </Form.Group>
      <input type="submit" value="ログイン" />
    </Form>
  );
};
