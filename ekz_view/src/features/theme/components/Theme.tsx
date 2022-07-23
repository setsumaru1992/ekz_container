import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { Theme } from '../models/queries';

type Props = {
  theme: Theme;
};

export default (props: Props) => {
  const { theme } = props;
  const [editing, setEditing] = useState(false);
  const iconStyle = { color: 'black' };
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {!editing ? (
        <>
          <Link
            href={{
              pathname: '/mypage/themes/[themeId]',
            }}
            as={`/mypage/themes/${theme.id}`}
          >
            <a
              style={{
                marginRight: 'auto',
              }}
            >
              {theme.name}
            </a>
          </Link>
          {theme.description ? (
            <>
              <br />
              {theme.description}
            </>
          ) : null}
        </>
      ) : (
        <>ここに編集フォーム。名前欄・説明欄をそのままテキストボックスへ</>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant="outline-primary" onClick={() => setEditing(!editing)}>
          {!editing ? '編集' : '編集キャンセル'}
        </Button>
        <a href="#">
          <i
            className="fas fa-trash fa-fw"
            style={iconStyle}
            onClick={() => {
              const deleteOk =
                window.confirm('本当に削除してもよろしいですか？');
              if (!deleteOk) return;
              // actionAsyncThemeDestroy(theme.id);
            }}
          />
        </a>
      </div>
    </div>
  );
};
