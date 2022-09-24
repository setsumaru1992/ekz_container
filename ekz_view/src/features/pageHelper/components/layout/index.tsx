import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  const { children } = props;
  return <>{children}</>;
};
