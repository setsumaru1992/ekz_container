import React from 'react';
import { Choice } from '../../../../graphql/generated/graphql';

// TODO: util化。タイトルのところでも使用中
const openUrlInNewTab = (url) => {
  window.open(url, String(new Date().getTime()));
};

export default (props: { choice: Choice }) => {
  const { choice } = props;
  const choiceUrl = choice.url ? choice.url : '#';
  const imageUrl = (() => {
    if (choice.uploadedImageUrl) {
      return choice.uploadedImageUrl;
    }
    if (choice.webpageCaptureUrl) {
      return choice.webpageCaptureUrl;
    }
    return 'https://ekz-images.s3-ap-northeast-1.amazonaws.com/static/no_image.png';
  })();

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
      <img src={imageUrl} style={{ width: '100%', padding: '0px 20px' }} />
    </a>
  );
};
