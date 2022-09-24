import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Row, Col, Form, Button } from 'react-bootstrap';
import useSession, { LoginInput } from '../models/commands/useSession';
import authCookieManager from '../authCookieManager';
import { TOP_PAGE_AFTER_LOGIN_URL } from '../../pageHelper/consts';

export default (props) => {
  const { login, commandLoading } = useSession();
  const [isLoginError, setIsLoginError] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = (input) => {
    if (Object.keys(errors).length !== 0) return false;

    login(input, {
      onCompleted: (data) => {
        const { accessKey } = data.login;
        if (!accessKey) {
          setIsLoginError(true);
        }
        authCookieManager.setAccessKey(accessKey);
        router.push(TOP_PAGE_AFTER_LOGIN_URL);
      },
    });
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
              type="password"
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
      <Form.Group>
        <Col smoffset={2} sm={5}>
          <Button
            variant="outline-primary"
            type="submit"
            disabled={commandLoading}
          >
            ログイン
          </Button>
        </Col>
      </Form.Group>
      {isLoginError && <div>ログインに失敗しました。</div>}
    </Form>
  );
};
