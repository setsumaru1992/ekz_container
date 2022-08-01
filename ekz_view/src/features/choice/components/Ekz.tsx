import React from 'react';
import Link from 'next/link';
import Choice from './Choice';
import usePickEkzQuery from '../models/queries/usePickEkzQuery';
import useThemeQuery from '../../theme/models/queries/useThemeQuery';

interface Props {
  themeId: number;
}

const Header = (props) => {
  const { theme } = props;

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
        {/* {this.newChoiceCreateAreaIntoThisTheme( */}
        {/*  theme, */}
        {/*  visibleFormMap, */}
        {/*  actionChoiceVisibleForm, */}
        {/* )} */}
      </div>
    </div>
  );
};

const SwitchEkzAreaContainer = (changePage) => {
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
      <a href="#" style={leftSwitchAreaStyle} onClick={() => changePage()}>
        <i style={textStyle} className="fas fa-chevron-left" />
      </a>
      <a href="#" style={rightSwitchAreaStyle} onClick={() => changePage()}>
        <i style={textStyle} className="fas fa-chevron-right" />
      </a>
    </>
  );
};

const ChoiceComponent = (props) => {
  const { loading, choice } = props;
  if (!choice) {
    return <>選択肢を作成してください</>;
  }
  return <Choice choice={choice} />;
};

export default (props: Props) => {
  const { themeId } = props;
  const { theme, fetchLoading: themeFetchLoading } = useThemeQuery(themeId);
  const {
    choice,
    loading: pickEkzLoading,
    error,
    repick,
  } = usePickEkzQuery(themeId);
  const loading = themeFetchLoading || pickEkzLoading;

  if (loading) return <>ロード中</>;
  return (
    <>
      <Header theme={theme} />
      <div style={{ position: 'relative' }}>
        <SwitchEkzAreaContainer changePage={() => {}} />
        <div
          style={{
            margin: '0px 20px',
            borderStyle: 'solid',
            borderWidth: '8px 0px',
            borderColor: '#F5F5F5',
          }}
        >
          <ChoiceComponent loading={loading} choice={choice} />
        </div>
      </div>
    </>
  );
};
