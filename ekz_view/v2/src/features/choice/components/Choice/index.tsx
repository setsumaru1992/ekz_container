import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Choice } from '../../models/queries/pickEkz';
import ChoiceTitleAndProperties from './ChoiceTitleAndProperties';
import Menu from './Menu';
import Image from './Image';

interface Props {
  choice: Choice;
  onRemoved?: any;
}

export default (props: Props) => {
  const { choice: choiceFromProp, onRemoved } = props;

  const [updatedChoices, setUpdateChoice] = useState({});
  const updateDisplayingChoice = (updatedChoiceArg) => {
    updatedChoices[updatedChoiceArg.id] = updatedChoiceArg;
    setUpdateChoice(updatedChoices);
  };
  const choice: Choice =
    (updatedChoices[choiceFromProp.id] as Choice) || choiceFromProp;

  const onThisChoiceRemoved = (id) => {
    updatedChoices[id] = null;
    setUpdateChoice(updatedChoices);

    if (onRemoved) onRemoved(id);
  };

  return (
    <>
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
      <Image choice={choice} />
      {/* <CommentAreaContainer /> */}
    </>
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
