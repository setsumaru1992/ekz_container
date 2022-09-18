import React, { useState } from 'react';
import { Col, Button, Table } from 'react-bootstrap';
import { Choice } from '../../models/queries/pickEkz';
import ChoiceTitleAndProperties from './ChoiceTitleAndProperties';

interface Props {
  choice: Choice;
}

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
  const { choice: choiceFromProp } = props;

  const [updatedChoices, setUpdateChoice] = useState({});
  const updateDisplayingChoice = (updatedChoiceArg) => {
    updatedChoices[updatedChoiceArg.id] = updatedChoiceArg;
    setUpdateChoice(updatedChoices);
  };
  const choice = updatedChoices[choiceFromProp.id] || choiceFromProp;
  return (
    <Col xs={12} md={12}>
      <div style={{ display: 'flex' }}>
        <ChoiceTitleAndProperties
          choice={choice}
          updateDisplayingChoice={updateDisplayingChoice}
        />
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
          {/* TODO:
            - イイネボタンと削除ボタン合わせてMenuコンポーネントに修正
          */}
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
      {/* <CommentAreaContainer /> */}
    </Col>
  );
};
