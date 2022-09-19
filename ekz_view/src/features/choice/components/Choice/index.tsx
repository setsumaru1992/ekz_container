import React, { useState } from 'react';
import { Col, Button, Table } from 'react-bootstrap';
import { Choice } from '../../models/queries/pickEkz';
import ChoiceTitleAndProperties from './ChoiceTitleAndProperties';
import Menu from './Menu';

interface Props {
  choice: Choice;
  onRemoved?: any;
}

// TODO: util化。タイトルのところでも使用中
const openUrlInNewTab = (url) => {
  window.open(url, String(new Date().getTime()));
};

export default (props: Props) => {
  const { choice: choiceFromProp, onRemoved } = props;

  const [updatedChoices, setUpdateChoice] = useState({});
  const updateDisplayingChoice = (updatedChoiceArg) => {
    updatedChoices[updatedChoiceArg.id] = updatedChoiceArg;
    setUpdateChoice(updatedChoices);
  };
  const choice = updatedChoices[choiceFromProp.id] || choiceFromProp;

  const onThisChoiceRemoved = (id) => {
    updatedChoices[id] = null;
    setUpdateChoice(updatedChoices);

    if (onRemoved) onRemoved(id);
  };

  return (
    <Col xs={12} md={12}>
      <div style={{ display: 'flex' }}>
        <ChoiceTitleAndProperties
          choice={choice}
          updateDisplayingChoice={updateDisplayingChoice}
        />
        <Menu
          choice={choice}
          updateDisplayingChoice={updateDisplayingChoice}
          onRemoved={(id) => onThisChoiceRemoved(id)}
        />
      </div>

      {/* <ChoiceTagArea choiceId={choice.id} /> */}
      <ImageAreaConainer choice={choice} />
      {/* <CommentAreaContainer /> */}
    </Col>
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
