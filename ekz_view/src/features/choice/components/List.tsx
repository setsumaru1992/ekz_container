import React from 'react';
import Choice from './Choice';
import { Choice as ChoiceType } from '../models/queries/pickEkz';

export default (props: { themeId: number; choices: ChoiceType[] }) => {
  const { themeId, choices: choicesFromProps } = props;

  // TODO: このコンポーネントでrefetch含めて取得ロジック

  const choices = choicesFromProps || [];

  return (
    <>
      {/* 新規作成フォーム */}
      {choices.map((choice) => {
        return <Choice choice={choice} onRemoved={null} />;
      })}
    </>
  );
};
