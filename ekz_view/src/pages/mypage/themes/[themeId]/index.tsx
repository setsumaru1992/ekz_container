import React from 'react';
import { NextPage, GetServerSideProps } from 'next';

interface Props {
  themeId: number;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { themeId } = params;
  return { props: {themeId: Number(themeId)} };
}

const ChoicePage: NextPage<Props> = (props ) => {
  const { themeId } = props;
  return (
    <div>
      ChoicePage of {themeId}
    </div>
  )
}

export default ChoicePage;