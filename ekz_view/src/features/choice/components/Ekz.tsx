import React from 'react';
import Link from 'next/link';
import Choice from './Choice';

interface Props {
  themeId: number;
}

export default (props: Props) => {
  const { themeId } = props;
  return (
    <div>
      <div
        style={{
          margin: '0px 20px',
          borderStyle: 'solid',
          borderWidth: '8px 0px',
          borderColor: '#F5F5F5',
        }}
      >
        <Choice themeId={themeId} />
      </div>

      <Link
        href={{
          pathname: '/mypage/themes/[themeId]/choices/ekz',
        }}
        as={`/mypage/themes/${themeId}/choices/ekz`}
      >
        <a>このテーマのリストを見る</a>
      </Link>
      <Link
        href={{
          pathname: '/mypage/themes/[themeId]',
        }}
        as={`/mypage/themes/${themeId}`}
      >
        <a>テーマ一覧に戻る</a>
      </Link>
    </div>
  );
};
