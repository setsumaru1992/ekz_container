import React from 'react';
import { GetServerSideProps } from 'next';
import { logout } from '../features/auth/models/commands/useSession';
import { LOGIN_PAGE_URL } from '../features/pageHelper/consts';

export default () => <div>aa</div>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/mypage/themes',
      permanent: false,
    },
  };
};
