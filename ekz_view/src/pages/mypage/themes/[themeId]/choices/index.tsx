import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { ChoiceList } from '../../../../../features/choice';

interface Props {
  themeId: number;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { themeId } = params;
  return { props: { themeId: Number(themeId) } };
};

const ChoicePage: NextPage<Props> = (props: Props) => {
  const { themeId } = props;
  return <ChoiceList themeId={themeId} choices={null} />;
};

export default ChoicePage;
