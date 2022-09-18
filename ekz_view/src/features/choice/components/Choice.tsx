import React from 'react';
import { Col, Button, Table } from 'react-bootstrap';
import { Choice } from '../models/queries/pickEkz';

interface Props {
  choice: Choice;
}

const openUrlInNewTab = (url) => {
  window.open(url, String(new Date().getTime()));
};

const ChoiceName = (props: {
  choice: Choice;
  showChoicePropertyEditIcon: any;
}) => {
  const { choice, showChoicePropertyEditIcon } = props;
  const extractString = (str, maxLength) => {
    if (str.length > maxLength) {
      return `${str.substr(0, maxLength - 1)}...`;
    }
    return str;
  };
  const choiceName = extractString(choice.name, 20);

  let nameTag;
  if (choice.url) {
    nameTag = (
      <a
        href={choice.url}
        onMouseDown={(e) => {
          e.preventDefault();
          openUrlInNewTab(choice.url);
        }}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {choiceName}
        <br />({extractString(choice.url, 20)})
      </a>
    );
  } else {
    nameTag = choiceName;
  }

  const fontSize = '16px';
  return (
    <div
      style={{
        fontSize,
        display: 'inline-flex',
      }}
    >
      <h1
        style={{
          fontSize,
        }}
      >
        {nameTag}
      </h1>
      &nbsp;
      {/* {showChoicePropertyEditIcon()} */}
    </div>
  );
};

// 命名はコピー元を踏襲。名前はこれでなければならないわけではない
const ImageAreaConainer = (choice) => {
  let imageSrc =
    'https://ekz-images.s3-ap-northeast-1.amazonaws.com/static/no_image.png';
  if (choice.image_filename) {
    imageSrc = choice.image_filename.url;
  } else if (choice.webpage_capture) {
    imageSrc = choice.webpage_capture;
  }

  const imageUrl = choice.url ? choice.url : '#';

  return (
    <a
      href={imageUrl}
      onMouseDown={(e) => {
        e.preventDefault();
        openUrlInNewTab(imageUrl);
      }}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <img src={imageSrc} style={{ width: '100%', padding: '0px 20px' }} />
    </a>
  );
};

const CommentAreaContainer = (
  commentMap,
  visibleCommentFormMap,
  choiceId,
  actionChoiceVisibleCommentForm,
) => {
  const comments = commentMap[choiceId] ? commentMap[choiceId] : [];
  return (
    <div>
      <div>
        コメント一覧
        <Button
          variant="outline-primary"
          onClick={() => actionChoiceVisibleCommentForm(choiceId)}
        >
          コメント追加
        </Button>
      </div>
      {/* {visibleCommentFormMap[`${choiceId}_`] */}
      {/*  ? <ChoiceCommentNew choiceId={choiceId}/> */}
      {/*  : null} */}
      <Table>
        <tbody>
          {comments.map((comment) => {
            const rawDateStr = comment.created_at;
            const dateStr = `${rawDateStr.substr(0, 4)}/${rawDateStr.substr(
              5,
              2,
            )}/${rawDateStr.substr(8, 2)} ${rawDateStr.substr(
              11,
              2,
            )}:${rawDateStr.substr(14, 2)}`;
            return (
              <tr key={comment.id}>
                <td>
                  <div
                    style={{
                      fontSize: '10px',
                      color: 'grey',
                    }}
                  >
                    {dateStr}
                    &nbsp;by&nbsp;
                    {comment.created_by}
                  </div>
                  {comment.content}
                  <div>編集 &emsp; 削除</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default (props: Props) => {
  const { choice } = props;
  const themeId = null; // 本来指定の必要がないので、変数無いエラーを防ぐためだけに定義
  return (
    <Col xs={12} md={12}>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <div>
            <div>
              <ChoiceName choice={choice} showChoicePropertyEditIcon={null} />
            </div>
            <div>
              {choice.description && choice.description !== '' && (
                <div style={{ display: 'inline-flex' }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: choice.description.replace(/\n/g, '<br />'),
                    }}
                  />
                  &nbsp;
                  {/* {showChoicePropertyEditIcon()} */}
                </div>
              )}
            </div>
          </div>
        </div>
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
          <a href="#">
            <i
              className="fas fa-trash fa-fw"
              style={{ color: 'black' }}
              onClick={() => {
                const deleteOk =
                  window.confirm('本当に削除してもよろしいですか？');
                if (!deleteOk) return;
                // actionAsyncChoiceDestroy(choiceId, themeId);
              }}
            />
          </a>
        </div>
      </div>
      {/* <ChoiceUpdateArea choice={null} themeId={themeId} visibleFormMap={null} /> */}

      {/* <ChoiceTagArea choiceId={choice.id} /> */}
      <ImageAreaConainer choice={{}} />
      <div>
        {/* {choiceEvaluationButtonGroup( */}
        {/*  choice.id, */}
        {/*  themeId, */}
        {/*  choice.evaluation, */}
        {/*  (value, event) => { */}
        {/*    // actionAsyncChoiceUpdateEvaluation(choice.id, value, themeId); */}
        {/*  }, */}
        {/* )} */}
      </div>
      <div>
        <Button
          variant="outline-primary"
          // onClick={() => actionChoiceVisibleForm(themeId, choice.id)}
        >
          編集
        </Button>
      </div>
      {/* <CommentAreaContainer /> */}
    </Col>
  );
};
