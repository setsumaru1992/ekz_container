import React from 'react';
import { GetServerSideProps } from 'next';
import { Theme } from '../../../features/theme/models/graphql';
import { useThemeByServerside, ThemeList } from '../../../features/theme';
import Layout from '../../../features/common/components/layout';

type Props = {
  themes: Theme[];
};

const dummyThemes = [
  {
    id: '1',
    name: 'ダミーテーマデータ',
    description: 'descriptiondescription',
  },
];

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await useThemeByServerside(context);
  return { props: { themes: data.themes } };
};

const Themes: React.FC<Props> = (props) => {
  const { themes } = props;
  return (
    <Layout>
      <ThemeList themes={themes} />
    </Layout>
  );
};

export default Themes;
