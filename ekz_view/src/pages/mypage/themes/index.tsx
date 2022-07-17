import React from 'react';
import { ThemeListArea } from '../../../features/theme';
import { Theme } from '../../../features/theme/models/graphql';
import { GetServerSideProps } from "next";
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../../../apolloClient'
import { useThemeByServerside } from "../../../features/theme";

type Props = {
  themes: Theme[];
}

const dummyThemes = [{
  id: "1",
  name: "ダミーテーマデータ",
  description: "descriptiondescription"
}]

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await useThemeByServerside(context)
  return { props: { themes: data.themes }}
}

const Themes : React.FC<Props> = (props) => {
  const { themes } = props;
  return(
    <ApolloProvider client={ apolloClient }>
      <ThemeListArea themes={themes} />
    </ApolloProvider>
  )
}

export default Themes