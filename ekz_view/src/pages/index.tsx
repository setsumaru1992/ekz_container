import React from 'react';
import { GetServerSideProps } from 'next';

export default () => <div>aa</div>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/mypage/themes',
      permanent: false,
    },
  };
};
