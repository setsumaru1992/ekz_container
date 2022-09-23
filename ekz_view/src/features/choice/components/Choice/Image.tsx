import React from 'react';
import { Choice } from '../../../../graphql/generated/graphql';

// TODO: util化。タイトルのところでも使用中
const openUrlInNewTab = (url) => {
  window.open(url, String(new Date().getTime()));
};

export default (props: { choice: Choice }) => {
  const { choice } = props;
  const choiceUrl = choice.url ? choice.url : '#';

  return (
    <a
      href={choiceUrl}
      onMouseDown={(e) => {
        e.preventDefault();
        openUrlInNewTab(choiceUrl);
      }}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <img
        src={choice.imageUrl}
        style={{ width: '100%', padding: '0px 20px' }}
      />
    </a>
  );
};
