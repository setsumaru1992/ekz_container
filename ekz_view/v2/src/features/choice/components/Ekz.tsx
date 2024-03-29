import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import * as CSS from 'csstype'; // https://akamist.com/blog/archives/5301
import Choice from './Choice';
import { Choice as ChoiceType } from '../models/queries/pickEkz';
import usePickEkzQuery from '../models/queries/usePickEkzQuery';
import useThemeQuery from '../../theme/models/queries/useThemeQuery';
import NewChoiceForm from './NewChoiceForm';
import useChoosenEkzs, { ChangeType } from './useChoosenEkzs';
import Header from './Header';

interface Props {
  themeId: number;
}

const SwitchEkzAreaContainer = ({ changePage }) => {
  const switchAreaBaseStyle: CSS.Properties = {
    width: '20px',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#F5F5F5',
  };
  const leftSwitchAreaStyle: CSS.Properties = {
    left: '0px',
    textAlign: 'left',
    ...switchAreaBaseStyle,
  };
  const rightSwitchAreaStyle: CSS.Properties = {
    right: '0px',
    textAlign: 'center',
    ...switchAreaBaseStyle,
  };

  const textStyle: CSS.Properties = {
    height: '100%',
    position: 'absolute',
    transform: 'translateY(50%)', // https://saruwakakun.com/html-css/basic/centering
    color: 'black',
  };

  return (
    <>
      <a
        href="#"
        style={leftSwitchAreaStyle}
        onClick={() => changePage(ChangeType.Prev)}
      >
        <i style={textStyle} className="fas fa-chevron-left" />
      </a>
      <a
        href="#"
        style={rightSwitchAreaStyle}
        onClick={() => changePage(ChangeType.Next)}
      >
        <i style={textStyle} className="fas fa-chevron-right" />
      </a>
    </>
  );
};

const ChoiceComponent = (props: { choice: ChoiceType; onRemoved: any }) => {
  const { choice, onRemoved } = props;
  if (!choice) {
    return <>表示できる選択肢がありません。選択肢を作成してください</>;
  }
  return (
    <Col xs={12} md={12}>
      <Choice choice={choice} onRemoved={onRemoved} />
    </Col>
  );
};

export default (props: Props) => {
  const { themeId } = props;
  const { theme, fetchLoading: themeFetchLoading } = useThemeQuery(themeId);
  const { choice, loading: pickEkzLoading, repick } = usePickEkzQuery(themeId);
  const loading = themeFetchLoading || pickEkzLoading;

  const {
    selectedChoice,
    changePage,
    addNewChoiceAndTransitionToNewChoice,
    removeSelectedChoiceAndTransition,
  } = useChoosenEkzs(choice, repick);

  const [newChoiceCreating, setNewChoiceCreating] = useState(false);
  const onCreated = async (createdChoice) => {
    await addNewChoiceAndTransitionToNewChoice(createdChoice);
    setNewChoiceCreating(false);
  };
  const onRemoved = () => {
    removeSelectedChoiceAndTransition();
  };

  if (loading) return <>ロード中</>;
  return (
    <>
      <Header
        theme={theme}
        newChoiceCreating={newChoiceCreating}
        setNewChoiceCreating={setNewChoiceCreating}
      />
      <div style={{ position: 'relative' }}>
        {!newChoiceCreating && (
          <SwitchEkzAreaContainer changePage={changePage} />
        )}
        <div
          style={{
            margin: '0px 20px',
            borderStyle: 'solid',
            borderWidth: '8px 0px',
            borderColor: '#F5F5F5',
          }}
        >
          {!newChoiceCreating ? (
            <ChoiceComponent choice={selectedChoice} onRemoved={onRemoved} />
          ) : (
            <NewChoiceForm onCreated={onCreated} themeId={theme.id} />
          )}
        </div>
      </div>
    </>
  );
};
