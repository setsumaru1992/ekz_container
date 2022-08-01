import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Choice from './Choice';
import usePickEkzQuery from '../models/queries/usePickEkzQuery';
import useThemeQuery from '../../theme/models/queries/useThemeQuery';

interface Props {
  themeId: number;
}

enum ChangeType {
  Prev,
  Next,
}

const useChoosenList = (pickedChoice, repick) => {
  const [fetchedChoices, setFetchedChoices] = useState([]);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState(0);

  useEffect(() => {
    if (!pickedChoice) return;

    const choicesForUpdate = [].concat(fetchedChoices);
    choicesForUpdate.push(pickedChoice);
    setFetchedChoices(choicesForUpdate);
  }, [pickedChoice]);

  const idxExceedsArrayLength = (arr, idx) => {
    return arr.length - 1 < idx;
  };

  let selectedChoice;
  if (!idxExceedsArrayLength(fetchedChoices, selectedChoiceIdx)) {
    selectedChoice = fetchedChoices[selectedChoiceIdx];
  } else if (fetchedChoices.length > 0) {
    selectedChoice = fetchedChoices[fetchedChoices.length - 1];
  }

  const changePage = async (changeType: ChangeType) => {
    if (changeType === ChangeType.Prev) {
      if (selectedChoiceIdx === 0) {
        return;
      }
      setSelectedChoiceIdx(selectedChoiceIdx - 1);
    }

    if (changeType === ChangeType.Next) {
      if (idxExceedsArrayLength(fetchedChoices, selectedChoiceIdx + 1)) {
        await repick(selectedChoice.id);
      }
      setSelectedChoiceIdx(selectedChoiceIdx + 1);
    }
  };

  return {
    selectedChoice,
    changePage,
  };
};

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

const ChoiceComponent = (props) => {
  const { choice } = props;
  if (!choice) {
    return <>表示できる選択肢がありません。選択肢を作成してください</>;
  }
  return <Choice choice={choice} />;
};

export default (props: Props) => {
  const { themeId } = props;
  const { theme, fetchLoading: themeFetchLoading } = useThemeQuery(themeId);
  const { choice, loading: pickEkzLoading, repick } = usePickEkzQuery(themeId);
  const loading = themeFetchLoading || pickEkzLoading;

  const { selectedChoice, changePage } = useChoosenList(choice, repick);

  if (loading) return <>ロード中</>;
  return (
    <>
      <Header theme={theme} />
      <div style={{ position: 'relative' }}>
        <SwitchEkzAreaContainer changePage={changePage} />
        <div
          style={{
            margin: '0px 20px',
            borderStyle: 'solid',
            borderWidth: '8px 0px',
            borderColor: '#F5F5F5',
          }}
        >
          <ChoiceComponent loading={loading} choice={selectedChoice} />
        </div>
      </div>
    </>
  );
};
