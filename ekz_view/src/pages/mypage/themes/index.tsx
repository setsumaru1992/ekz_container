import React from 'react';
import { GetServerSideProps } from 'next';
import {
  prefetchThemesByServerside,
  ThemeList,
  ThemeType,
} from '../../../features/theme';
import captureError from '../../../features/pageHelper/captureError';

type Props = {
  themes: ThemeType[];
};

const dummyThemes = [
  {
    id: '1',
    name: 'ダミーテーマデータ',
    description: 'descriptiondescription',
  },
];

export const getServerSideProps: GetServerSideProps = async (context) => {
  return captureError(async () => {
    const { data } = await prefetchThemesByServerside(context);
    return { props: { themes: data.themes } };
  });
};

const Themes: React.FC<Props> = (props) => {
  const { themes } = props;
  return <ThemeList themes={themes} />;
};

export default Themes;
