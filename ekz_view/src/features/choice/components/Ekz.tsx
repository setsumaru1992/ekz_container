import React from 'react';

interface Props {
  themeId: number;
}

export default (props: Props) => {
  const { themeId } = props;
  return <div>{themeId}</div>;
};
