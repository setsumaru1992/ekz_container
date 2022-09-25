import Link from 'next/link';
import React from 'react';

export default (props) => {
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
            <Link
              href={{
                pathname: '/mypage/themes/[theme.id]/choices',
              }}
              as={`/mypage/themes/${theme.id}/choices`}
            >
              {theme.name}
            </Link>
          </h2>
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
