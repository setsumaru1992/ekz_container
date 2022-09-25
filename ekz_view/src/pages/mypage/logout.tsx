import React from 'react';
import { GetServerSideProps } from 'next';
import { logout } from '../../features/auth/models/commands/useSession';
import { LOGIN_PAGE_URL } from '../../features/pageHelper/consts';

export default (props) => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await logout(context);
  return {
    redirect: {
      destination: LOGIN_PAGE_URL,
      permanent: false,
    },
  };
};
