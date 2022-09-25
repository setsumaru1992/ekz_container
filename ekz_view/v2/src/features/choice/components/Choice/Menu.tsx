import React from 'react';
import useChoiceCommand, {
  UpdateChoice,
} from '../../models/commands/useChoiceCommand';
import { Choice } from '../../models/queries/pickEkz';

const EVALUATION_GOOD = 1;
const EVALUATION_NOT_EVALUATED = 0;
export default (props: {
  choice: Choice;
  updateDisplayingChoice: any;
  onRemoved: any;
}) => {
  const { choice, updateDisplayingChoice, onRemoved } = props;
  const { updateChoice, removeChoice } = useChoiceCommand();

  const evaluated = choice.evaluation === EVALUATION_GOOD;
  const reversedEvaluation = !evaluated
    ? EVALUATION_GOOD
    : EVALUATION_NOT_EVALUATED;
  const switchEvaluation = () => {
    updateChoice({ evaluation: reversedEvaluation }, choice, {
      onCompleted: async (updatedChoice) => {
        updateDisplayingChoice(updatedChoice);
      },
    });
  };

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
        style={evaluated ? { color: 'black' } : { color: '#CCCCCC' }}
        onClick={() => {
          switchEvaluation();
        }}
      />
      &nbsp;
      <a href="#">
        <i
          className="fas fa-trash fa-fw"
          style={{ color: 'black' }}
          onClick={() => {
            const deleteOk = window.confirm('本当に削除してもよろしいですか？');
            if (!deleteOk) return;
            removeChoice(choice.id, {
              onCompleted: () => {
                onRemoved(choice.id);
              },
            });
          }}
        />
      </a>
    </div>
  );
};
