import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Choice from './Choice';
import { Choice as ChoiceType } from '../models/queries/pickEkz';
import useChoicesQuery from '../models/queries/useChoicesQuery';

export default (props: { themeId: number; choices: ChoiceType[] }) => {
  const { themeId, choices: choicesFromProps } = props;

  // TODO: このコンポーネントでrefetch含めて取得ロジック
  const {
    choices: choicesByFetching,
    fetchLoading,
    refetch,
  } = useChoicesQuery(themeId, true);

  const choices = choicesFromProps || choicesByFetching || [];

  if (fetchLoading) return <div>Loading...</div>; // 必ずhooksがすべて終わった後に分岐を使う
  return (
    <Container>
      <Row>
        {/* 新規作成フォーム */}
        {choices.map((choice) => {
          return (
            <Col xs={6} md={3}>
              <Choice choice={choice} onRemoved={null} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
