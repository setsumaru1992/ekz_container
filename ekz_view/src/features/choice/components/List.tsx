import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Choice from './Choice';
import Header from './Header';
import { Choice as ChoiceType } from '../models/choice';
import useChoicesQuery from '../models/queries/useChoicesQuery';
import useThemeQuery from '../../theme/models/queries/useThemeQuery';
import NewChoiceForm from './NewChoiceForm';

export default (props: { themeId: number; choices: ChoiceType[] }) => {
  const { themeId, choices: choicesFromProps } = props;

  const {
    choices: choicesByFetching,
    fetchLoading,
    refetch,
  } = useChoicesQuery(themeId, true);
  const { theme, fetchLoading: themeFetchLoading } = useThemeQuery(themeId);
  const loading = themeFetchLoading || fetchLoading;

  const choices = choicesFromProps || choicesByFetching || [];

  const [newChoiceCreating, setNewChoiceCreating] = useState(false);
  const onCreated = () => {
    setNewChoiceCreating(false);
    refetch();
  };

  const onRemoved = () => {
    refetch();
  };

  if (loading) return <div>Loading...</div>; // 必ずhooksがすべて終わった後に分岐を使う
  return (
    <Container>
      <Header
        theme={theme}
        newChoiceCreating={newChoiceCreating}
        setNewChoiceCreating={setNewChoiceCreating}
      />
      <Row>
        {newChoiceCreating && (
          <Col xs={6} md={3}>
            <NewChoiceForm onCreated={onCreated} themeId={theme.id} />
          </Col>
        )}
        {choices.map((choice) => {
          return (
            <Col xs={6} md={3}>
              <Choice choice={choice} onRemoved={onRemoved} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
