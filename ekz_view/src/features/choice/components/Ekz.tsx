import React, { useState } from 'react';
import Link from 'next/link';
import { Col } from 'react-bootstrap';
import Choice from './Choice';
import { Choice as ChoiceType } from '../models/queries/pickEkz';
import usePickEkzQuery from '../models/queries/usePickEkzQuery';
import useThemeQuery from '../../theme/models/queries/useThemeQuery';
import NewChoiceForm from './NewChoiceForm';
import useChoosenEkzs, { ChangeType } from './useChoosenEkzs';

interface Props {
  themeId: number;
}

const Header = (props) => {
  const { theme, newChoiceCreating, setNewChoiceCreating } = props;

  const fontSize = '0.8rem';
  return (
    <div style={{ display: 'flex', height: '2rem' }}>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: '-webkit-inline-box',
            fontSize,
          }}
        >
          <h2
            style={{
              fontSize,
              lineHeight: 'initial',
            }}
          >
            <Link
              href={{
                pathname: '/mypage/themes',
              }}
              as="/mypage/themes"
            >
              テーマ一覧
            </Link>
            &nbsp;&gt;&nbsp;
            {theme.name}
          </h2>
          (
          <Link
            href={{
              pathname: '/mypage/themes/[theme.id]/choices',
            }}
            as={`/mypage/themes/${theme.id}/choices`}
          >
            このテーマの選択肢を見る
          </Link>
          )
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginLeft: 'auto',
        }}
      >
        <div onClick={() => setNewChoiceCreating(!newChoiceCreating)}>
          <i className="fas fa-edit" />
          新規追加
        </div>
      </div>
    </div>
  );
};

const SwitchEkzAreaContainer = ({ changePage }) => {
  const switchAreaBaseStyle = {
    width: '20px',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#F5F5F5',
  };
  const leftSwitchAreaStyle = {
    left: '0px',
    textAlign: 'left',
    ...switchAreaBaseStyle,
  };
  const rightSwitchAreaStyle = {
    right: '0px',
    textAlign: 'center',
    ...switchAreaBaseStyle,
  };

  const textStyle = {
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
