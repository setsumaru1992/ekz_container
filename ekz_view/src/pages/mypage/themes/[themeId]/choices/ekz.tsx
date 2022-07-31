import React from 'react';
import { GetServerSideProps } from 'next';
import Ekz from '../../../../../features/choice/components/Ekz';

interface Props {
  themeId: number;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { themeId } = params;
  return { props: { themeId: Number(themeId) } };
};

export default (props: Props) => {
  const { themeId } = props;
  return <Ekz themeId={themeId} />;
};
