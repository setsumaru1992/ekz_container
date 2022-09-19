import React from 'react';

export default (props) => {
  return (
    <div style={{ display: 'flex', marginLeft: 'auto' }}>
      {/* 詳細ページ未作成のためコメントアウト */}
      {/* <Link */}
      {/*  href={{ */}
      {/*    pathname: '/mypage/themes/[themeId]/choices', */}
      {/*  }} */}
      {/*  as={`/mypage/themes/${themeId}/choices`} */}
      {/*  style={{ */}
      {/*    marginRight: 'auto', */}
      {/*  }} */}
      {/* > */}
      {/*  <i className="far fa-list-alt fa-fw" style={iconStyle} /> */}
      {/* </Link> */}
      <i
        className="fas fa-thumbs-up fa-fw"
        style={false ? { color: 'black' } : { color: '#CCCCCC' }}
      />
      &nbsp;
      <a href="src/features/choice/components/Choice/Choice#">
        <i
          className="fas fa-trash fa-fw"
          style={{ color: 'black' }}
          onClick={() => {
            const deleteOk = window.confirm('本当に削除してもよろしいですか？');
            if (!deleteOk) return;
            // actionAsyncChoiceDestroy(choiceId, themeId);
          }}
        />
      </a>
    </div>
  );
};
